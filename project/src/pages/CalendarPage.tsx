import { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parseISO, startOfWeek, getDay, addHours } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parseISO,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
});

type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  color?: string;
};

export default function CalendarPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    start: new Date(),
    end: addHours(new Date(), 1),
  });

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user?.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      
      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
        color: event.color
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.start || !newEvent.end) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert([{
          user_id: user?.id,
          title: newEvent.title,
          description: newEvent.description,
          start_time: newEvent.start.toISOString(),
          end_time: newEvent.end.toISOString(),
          color: newEvent.color
        }])
        .select();

      if (error) throw error;
      if (data) {
        await fetchEvents();
        setShowModal(false);
      }
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  const handleDeleteEvent = async () => {
    if (!newEvent.id) return;

    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', newEvent.id);

      if (error) throw error;
      
      await fetchEvents();
      setShowModal(false);
    } catch (err) {
      console.error('Error deleting event:', err);
    }
  };

  const eventStyleGetter = (event: CalendarEvent) => ({
    style: {
      backgroundColor: event.color || '#e2e8f0',
      borderRadius: '4px',
      border: 'none',
      color: '#1e293b',
      padding: '2px 5px'
    }
  });

  const formatDateTimeLocal = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Schedule Calendar</h1>
        
        <button
          onClick={() => {
            setNewEvent({
              start: new Date(),
              end: addHours(new Date(), 1),
            });
            setShowModal(true);
          }}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          New Event
        </button>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            views={['month', 'week', 'day', 'agenda']}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => {
              setNewEvent(event);
              setShowModal(true);
            }}
          />
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {newEvent.id ? 'Edit' : 'New'} Event
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Time *</label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full p-2 border rounded-lg"
                      value={formatDateTimeLocal(newEvent.start || new Date())}
                      onChange={(e) => setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                        end: new Date(e.target.value).getTime() > (newEvent.end?.getTime() || 0) 
                          ? addHours(new Date(e.target.value), 1)
                          : newEvent.end
                      })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">End Time *</label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full p-2 border rounded-lg"
                      value={formatDateTimeLocal(newEvent.end || addHours(new Date(), 1))}
                      onChange={(e) => setNewEvent({
                        ...newEvent, 
                        end: new Date(e.target.value)
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <input
                    type="color"
                    className="w-full h-10 rounded-lg cursor-pointer"
                    value={newEvent.color || '#e2e8f0'}
                    onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                {newEvent.id && (
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}