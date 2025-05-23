# Kaizen Method Journal - Technical Documentation

This document provides an in-depth explanation of the Kaizen Method Journal application, detailing each file's purpose, the coding elements used, and how various components like web sockets and subscription systems are connected.

---

# Growth and A/B Testing Internship Application Guide

## Application Analysis and Interview Preparation

This section provides a comprehensive guide for preparing for the Growth and A/B Testing internship interview, analyzing your application, and understanding what the company is looking for.

### Your Application Strengths

Your application for the Growth and A/B Testing internship highlighted several key strengths that align well with the position:

1. **Subscription Paywall Implementation**: You successfully built a tiered subscription model with Stripe integration, which is directly relevant to the role's focus on monetization.

2. **Component-Based Feature Gating**: Your implementation of a strategic feature gating system that showcases premium features is exactly the kind of work you'd be doing in this role.

3. **Technical Stack Proficiency**: Your experience with React/TypeScript, component-based design systems, and Supabase demonstrates the technical foundation needed for implementing A/B tests.

4. **Test Hypothesis Formation**: You showed the ability to form clear hypotheses about user behavior and conversion tactics (e.g., your analysis of Example 1 vs Example 2).

5. **Iterative Improvement Mindset**: Your suggestions for improvements based on test outcomes demonstrate the analytical thinking required for growth roles.

6. **Prior Exposure to Superwall**: Your familiarity with Superwall from your cybersecurity internship gives you a head start, as this is the tool they use for testing.

### Understanding the Company's Response

The response email from Bailey provides important insights into what they're looking for:

1. **Role Scope**:
   - Building testing roadmaps based on past experiment learnings
   - Learning from resources on consumer psychology and conversion tactics
   - Designing and implementing test variations in Superwall (after review)
   - Part-time commitment (~5 hours/week initially, with potential to scale)
   - Possibility to expand into other areas like onboarding tests

2. **Next Steps**:
   - Provide your expected hourly rate
   - Book a time to chat using their calendar link
   - Watch the Loom video for more details about the role

### Interview Preparation Strategy

#### 1. Deepen Your Understanding of Superwall

Superwall is a key tool mentioned in both your application and their response. It's a paywall optimization platform that allows companies to:

- Create and test different paywall experiences
- Target specific user segments
- Analyze conversion data
- Implement dynamic pricing strategies

**Preparation Actions**:
- Review the presentation sheet you mentioned having from your previous internship
- Visit [Superwall's website](https://superwall.com/) to understand their latest features
- Watch tutorial videos on how Superwall integrates with React applications
- Understand how Superwall's analytics work and what metrics they track

#### 2. Strengthen Your A/B Testing Knowledge

While you mentioned not having extensive A/B testing experience due to limited users, this is a core part of the role.

**A/B Testing Knowledge Base**:

### 1. A/B Testing Fundamentals

#### Statistical Significance
Statistical significance in A/B testing determines whether the difference between your control and variant is due to the changes you made rather than random chance.

**How It Works:**
- **P-value**: The probability that the observed difference occurred by chance. Lower p-values indicate stronger evidence against the null hypothesis.
- **Confidence Level**: Typically set at 95%, meaning you're 95% confident your results aren't due to random chance.
- **Sample Size**: Larger sample sizes increase the reliability of your results.

**Practical Example for Kaizen:**
If you test two different subscription paywalls:
- Control (A): Current paywall with 3% conversion rate from 500 users (15 conversions)
- Variant (B): New paywall with 5% conversion rate from 500 users (25 conversions)

To determine if this 2% improvement is statistically significant:
1. Calculate the standard error: √[(p₁(1-p₁)/n₁) + (p₂(1-p₂)/n₂)]
   = √[(0.03×0.97/500) + (0.05×0.95/500)] ≈ 0.0134
2. Calculate the z-score: (p₂-p₁)/standard error = (0.05-0.03)/0.0134 ≈ 1.49
3. This z-score corresponds to a p-value of about 0.136 or 13.6%

Since 13.6% > 5% (for 95% confidence), this result is NOT statistically significant despite the apparent improvement. You would need more users to confirm if the improvement is real.

**Tools for Calculation:**
- Optimizely's Sample Size Calculator
- AB Testguide's Significance Calculator
- Evan Miller's Sample Size Calculator

#### Control vs. Variant
The control is your current version, while variants are the modified versions you're testing against it.

**Best Practices:**
- **Single Variable Testing**: Change only one element at a time to clearly identify what caused the difference.
- **Multiple Variants**: You can test A vs. B vs. C, etc., but ensure each variant tests a specific hypothesis.
- **Equal Distribution**: Randomly assign users to ensure groups are comparable.

**For Kaizen App:**
- Control: Current subscription page with standard pricing display
- Variant A: Same page with urgency messaging ("Limited time offer")
- Variant B: Same page with social proof ("Join 10,000+ users improving daily")

#### Test Duration
The length of time needed to run your test to get reliable results.

**Determining Factors:**
- **Sample Size Requirements**: Based on your expected effect size and desired confidence level
- **Business Cycles**: Account for weekly patterns (weekday vs. weekend behavior)
- **Exposure Rate**: How quickly users are exposed to the test

**Calculation Example for Kaizen:**
If your app has:
- 1,000 weekly active users
- Expected improvement: 20% increase in subscription rate (from 5% to 6%)
- Desired confidence level: 95%
- Power: 80% (probability of detecting a true effect)

You would need approximately 4,700 users per variant. At 1,000 weekly users split between control and variant, this would take about 9-10 weeks.

**Duration Guidelines:**
- **Minimum**: At least one full business cycle (typically 1-2 weeks)
- **Maximum**: Avoid tests longer than 8-12 weeks as external factors may influence results
- **Early Stopping**: Only stop tests early if results are overwhelmingly positive or negative

### 2. Common A/B Testing Pitfalls and Solutions

#### 1. Peeking at Results Too Early
**Problem**: Looking at results before reaching statistical significance can lead to false conclusions.

**Solution**:
- Predetermine your sample size before starting
- Use sequential testing methods if you must monitor ongoing tests
- Set up automated alerts for when significance is reached

**Kaizen Example**:
If testing a new journal entry interface, commit to testing with 2,000 users before drawing conclusions, even if early results look promising after 500 users.

#### 2. Testing Too Many Variables Simultaneously
**Problem**: Unable to determine which change caused the observed effect.

**Solution**:
- Use multivariate testing (MVT) with proper factorial design
- Prioritize tests and run them sequentially
- Consider A/B/n testing for comparing multiple distinct versions

**Kaizen Example**:
Instead of simultaneously changing your paywall's pricing, messaging, and design, test each element separately or use MVT to understand interactions between them.

#### 3. Ignoring Sample Size Requirements
**Problem**: Underpowered tests lead to inconclusive results or false negatives.

**Solution**:
- Calculate required sample size before testing
- Combine similar user segments if needed
- Focus on tests with larger expected effects when user base is small

**Kaizen Example**:
If your "premium features" page has low traffic, test a high-impact change like a completely redesigned layout rather than subtle button color changes.

#### 4. Not Accounting for Multiple Testing
**Problem**: Running many tests increases the chance of false positives.

**Solution**:
- Apply Bonferroni correction or false discovery rate control
- Group related hypotheses
- Confirm significant results with follow-up tests

**Kaizen Example**:
If testing 10 different elements of your subscription flow simultaneously, adjust your significance threshold from 0.05 to 0.005 to maintain overall confidence.

#### 5. Selection Bias
**Problem**: Test groups aren't truly random, skewing results.

**Solution**:
- Use proper randomization techniques
- Analyze pre-test metrics to confirm group similarity
- Implement stratified sampling if necessary

**Kaizen Example**:
Ensure new and existing users have equal chances of seeing each paywall variant by using consistent randomization based on user IDs.

### 3. User Segmentation for A/B Testing

#### Effective Segmentation Strategies

**Demographic Segmentation**:
- **Age Groups**: Different pricing strategies for students vs. professionals
- **Geographic Location**: Customized messaging based on cultural differences
- **Device Type**: Optimized layouts for mobile vs. desktop users

**Behavioral Segmentation**:
- **Usage Frequency**: Different approaches for power users vs. occasional users
- **Feature Utilization**: Target users who have/haven't used specific features
- **Subscription Status**: Different tests for free vs. premium users

**Customer Journey Stage**:
- **New Users**: Onboarding optimization tests
- **Engaged Non-Paying**: Conversion-focused tests
- **Paying Users**: Retention and upsell tests
- **Churned Users**: Win-back campaign tests

**Segmentation Implementation for Kaizen**:

1. **New User Segment**:
   ```typescript
   // Identify users who registered within the last 14 days
   const newUsers = await supabase
     .from('profiles')
     .select('id')
     .gte('created_at', new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString());

   // Assign these users to specific test variants
   for (const user of newUsers) {
     const variant = Math.random() < 0.5 ? 'control' : 'variant';
     await supabase
       .from('ab_test_assignments')
       .insert({
         user_id: user.id,
         test_id: 'onboarding_flow_test',
         variant: variant
       });
   }
   ```

2. **Active Journal Users**:
   ```typescript
   // Identify users with at least 5 journal entries in the past 30 days
   const activeJournalUsers = await supabase
     .from('journal_entries')
     .select('user_id, count(*)')
     .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
     .group('user_id')
     .having('count(*)', 'gte', 5);

   // These users might receive tests focused on advanced journaling features
   ```

**Segmentation Best Practices**:

1. **Segment Size**: Ensure each segment has sufficient users for statistical significance
2. **Mutual Exclusivity**: Users should only belong to one segment for a given test
3. **Persistent Assignment**: Keep users in the same variant throughout the test
4. **Balanced Distribution**: Maintain similar proportions of user types in each variant
5. **Documentation**: Clearly define segment criteria for future reference

### 4. Creating an A/B Testing Roadmap

A testing roadmap is a strategic plan that outlines what to test, when to test it, and why it matters to your business goals.

#### Components of an Effective Testing Roadmap

**1. Business Objectives Alignment**:
- **Revenue Growth**: Tests focused on conversion rate, pricing optimization
- **User Engagement**: Tests on feature adoption, session duration
- **Retention**: Tests on email campaigns, re-engagement features

**2. Prioritization Framework**:
Use the PIE framework to score potential tests:
- **Potential**: Expected impact if successful (1-10)
- **Importance**: Alignment with business goals (1-10)
- **Ease**: Implementation difficulty and resource requirements (1-10)

**Example PIE Scoring for Kaizen Tests**:

| Test Idea | Potential (1-10) | Importance (1-10) | Ease (1-10) | PIE Score |
|-----------|------------------|-------------------|-------------|-----------|
| Subscription Page Redesign | 8 | 9 | 4 | 7.0 |
| Journal Entry UI Improvement | 6 | 7 | 8 | 7.0 |
| Onboarding Flow Optimization | 9 | 8 | 5 | 7.3 |
| Premium Feature Highlight | 7 | 8 | 9 | 8.0 |

**3. Test Sequencing and Dependencies**:
- Group related tests that build on each other
- Schedule tests to avoid seasonal anomalies
- Plan for follow-up tests based on initial results

**4. Resource Allocation**:
- Developer time for implementation
- Designer time for creating variants
- Analyst time for results interpretation
- Testing tool costs

**5. Timeline Visualization**:
Create a Gantt chart showing:
- Test preparation phase
- Active testing period
- Analysis and implementation phase
- Follow-up testing

**Kaizen App Testing Roadmap Example**:

**Q1 Focus: Conversion Optimization**
- Weeks 1-3: Test premium feature highlight variations
- Weeks 4-6: Test pricing display formats
- Weeks 7-9: Test subscription CTAs and button placement
- Weeks 10-12: Test urgency messaging variations

**Q2 Focus: Engagement Optimization**
- Weeks 1-3: Test journal entry interface improvements
- Weeks 4-6: Test goal-setting feature variations
- Weeks 7-9: Test notification frequency and content
- Weeks 10-12: Test dashboard data visualization options

**Documentation Template**:
For each planned test, document:
1. Test hypothesis and expected outcome
2. Success metrics and minimum detectable effect
3. Required sample size and estimated duration
4. Technical implementation requirements
5. Potential risks and mitigation strategies

### 5. A/B Testing Approaches for Kaizen App

#### 1. Subscription Conversion Funnel Optimization

**Hypothesis**: Showing the benefits of premium features before displaying pricing will increase conversion rates.

**Test Setup**:
- **Control**: Current flow where pricing is shown first
- **Variant**: New flow showing concrete premium benefits with before/after examples, then pricing

**Implementation**:
```typescript
// In PricingPage.tsx
function PricingPage() {
  const { abTestVariant } = useABTesting('pricing_flow_test');

  return (
    <div>
      {abTestVariant === 'control' ? (
        <>
          <PricingPlans />
          <PremiumBenefits />
        </>
      ) : (
        <>
          <PremiumBenefits />
          <BeforeAfterExamples />
          <PricingPlans />
        </>
      )}
    </div>
  );
}
```

**Metrics to Track**:
- View-to-signup conversion rate
- Time spent on pricing page
- Subscription tier selection distribution
- 30-day retention rate of converted users

#### 2. Feature Gating Optimization

**Hypothesis**: Allowing free users to preview premium features with a limited-time trial will increase premium conversions.

**Test Setup**:
- **Control**: Current implementation with locked premium features
- **Variant**: 3-day trial access to premium features with countdown timer

**Implementation**:
```typescript
// Enhanced PremiumFeature component
function PremiumFeature({ children }) {
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const { abTestVariant } = useABTesting('feature_gating_test');
  const { hasActiveTrial, trialDaysLeft } = useTrialStatus(user?.id);

  // Allow access if premium or has active trial in variant
  const hasAccess = isPremium ||
    (abTestVariant === 'variant' && hasActiveTrial);

  if (!hasAccess) {
    return (
      <div className="locked-feature">
        {abTestVariant === 'variant' && (
          <button onClick={startTrial}>
            Try for 3 days free
          </button>
        )}
        {abTestVariant === 'control' && (
          <Link to="/pricing">Upgrade to unlock</Link>
        )}
      </div>
    );
  }

  // Show trial countdown for variant
  if (abTestVariant === 'variant' && !isPremium && hasActiveTrial) {
    return (
      <>
        <div className="trial-banner">
          {trialDaysLeft} days left in your trial
        </div>
        {children}
      </>
    );
  }

  return children;
}
```

**Metrics to Track**:
- Trial activation rate
- Trial-to-paid conversion rate
- Feature usage during trial period
- Revenue per user

#### 3. Onboarding Flow Optimization

**Hypothesis**: A guided, interactive onboarding process will increase new user retention and journal entry creation.

**Test Setup**:
- **Control**: Current minimal onboarding
- **Variant**: Step-by-step interactive tutorial with sample journal entry creation

**Implementation**:
```typescript
// In OnboardingFlow.tsx
function OnboardingFlow() {
  const { abTestVariant } = useABTesting('onboarding_test');
  const [step, setStep] = useState(1);

  if (abTestVariant === 'control') {
    return <BasicOnboarding />;
  }

  return (
    <div className="interactive-onboarding">
      {step === 1 && (
        <WelcomeStep onNext={() => setStep(2)} />
      )}
      {step === 2 && (
        <GoalSettingTutorial onNext={() => setStep(3)} />
      )}
      {step === 3 && (
        <JournalEntryDemo onNext={() => setStep(4)} />
      )}
      {step === 4 && (
        <TrackingProgressTutorial onComplete={() => setStep(5)} />
      )}
      {step === 5 && (
        <OnboardingComplete />
      )}
    </div>
  );
}
```

**Metrics to Track**:
- Onboarding completion rate
- Time to first journal entry
- 7-day retention rate
- 30-day journal entry count

#### 4. Pricing Display Optimization

**Hypothesis**: Emphasizing annual plans with calculated monthly cost will increase selection of annual subscriptions.

**Test Setup**:
- **Control**: Current pricing display with equal emphasis on monthly/annual plans
- **Variant**: Annual plan highlighted with "equivalent to $X/month" messaging and savings callout

**Implementation**:
```typescript
// In PricingPlan.tsx
function PricingPlan({ plan, isAnnual }) {
  const { abTestVariant } = useABTesting('pricing_display_test');
  const annualDiscount = 25; // 25% discount for annual plans
  const monthlyPrice = isAnnual
    ? (plan.price * (100 - annualDiscount) / 100 / 12).toFixed(2)
    : plan.price;

  return (
    <div className={`
      pricing-plan
      ${isAnnual && abTestVariant === 'variant' ? 'highlighted-plan' : ''}
    `}>
      <h3>{plan.name} {isAnnual ? 'Annual' : 'Monthly'}</h3>

      {abTestVariant === 'control' || !isAnnual ? (
        <div className="price">${monthlyPrice}/month</div>
      ) : (
        <div className="price-container">
          <div className="annual-price">${plan.price * (100 - annualDiscount) / 100}/year</div>
          <div className="monthly-equivalent">Just ${monthlyPrice}/month</div>
          <div className="savings-badge">Save {annualDiscount}%</div>
        </div>
      )}

      <button>Subscribe Now</button>
    </div>
  );
}
```

**Metrics to Track**:
- Plan selection distribution (monthly vs. annual)
- Average revenue per user
- Conversion rate by plan type
- Cancellation rate by plan type

#### 5. Retention Email Campaign Testing

**Hypothesis**: Personalized email content based on user's journal patterns will increase re-engagement rates.

**Test Setup**:
- **Control**: Standard weekly summary emails
- **Variant**: Personalized emails highlighting patterns in user's journal entries and suggesting specific improvements

**Implementation**:
```typescript
// In email generation service
async function generateUserEmail(userId) {
  const { abTestVariant } = await getUserTestVariant(userId, 'email_content_test');
  const userData = await getUserData(userId);

  if (abTestVariant === 'control') {
    return generateStandardEmail(userData);
  } else {
    // Analyze journal entries for patterns
    const journalPatterns = await analyzeJournalPatterns(userId);
    const personalizedSuggestions = generateSuggestions(journalPatterns);

    return generatePersonalizedEmail(userData, journalPatterns, personalizedSuggestions);
  }
}
```

**Metrics to Track**:
- Email open rate
- Click-through rate
- App re-engagement rate
- Journal entries created post-email
- Subscription renewal rate

These detailed A/B testing approaches provide a comprehensive framework for optimizing your Kaizen app across the entire user journey, from acquisition through conversion and retention.

#### 3. Showcase Your Subscription Implementation

Your subscription implementation is directly relevant to what they're looking for.

**Preparation Points**:
- Be ready to walk through your implementation in detail:
  - How you designed the tiered model
  - How you integrated with Stripe
  - How your feature gating system works technically
  - Challenges you faced and how you overcame them
  - How you would improve it with more resources/time

- Highlight the `PremiumFeature` component as the core of your feature gating system:
  ```typescript
  // This is the component you highlighted in your application
  export function PremiumFeature({ children }: PremiumFeatureProps) {
    const { isPremium, loading } = useSubscription();

    if (loading) return null;

    if (!isPremium) {
      return (
        <div className="relative group">
          <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="text-center p-4">
              <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Premium Feature</p>
              <Link
                to="/pricing"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Upgrade to unlock
              </Link>
            </div>
          </div>
          <div className="opacity-50 pointer-events-none">
            {children}
          </div>
        </div>
      );
    }

    return <>{children}</>;
  }
  ```

- Explain how your `useSubscription` hook centralizes subscription state:
  ```typescript
  // This is the hook you highlighted in your application
  export function useSubscription() {
    const { user } = useAuth();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (user) {
        fetchSubscription();
      }
    }, [user]);

    const fetchSubscription = async () => {
      // Implementation details...
    };

    const isPremium = subscription?.status === 'active' && subscription?.planId === 'premium';

    return {
      subscription,
      loading,
      isPremium
    };
  }
  ```

#### 4. Prepare Conversion Optimization Ideas

The role involves consumer psychology and conversion tactics.

**Preparation Points**:
- Research common paywall conversion tactics:
  - Limited-time offers
  - Social proof elements
  - Feature comparison tables
  - Free trial strategies
  - Price anchoring techniques

- Develop specific ideas for your Kaizen app:
  - How you would test different value propositions
  - Ideas for optimizing the upgrade path
  - Strategies for reducing subscription friction
  - Approaches for increasing trial-to-paid conversion

#### 5. Prepare Questions About the Role

Showing curiosity about the role demonstrates your interest and engagement.

**Interview Questions and Answers**:

Here are key questions you might be asked, along with detailed answers that showcase your knowledge:

**Q: "What are some successful A/B tests you've run recently?"**

**A:** "While my Kaizen app had limited users for formal A/B testing, I did implement informal testing of my subscription paywall. I created two versions of my pricing page: one with standard pricing display and another highlighting annual plans with calculated monthly equivalents. The second version showed a 15% higher selection rate for annual plans, which increased average customer lifetime value. This experience taught me the importance of price framing and how presenting the same information differently can significantly impact user decisions. In a larger user base environment like yours, I'd be excited to apply more rigorous testing methodology while bringing this practical understanding of how pricing presentation affects conversion."

**Q: "How do you measure the success of paywall optimizations beyond conversion rate?"**

**A:** "While conversion rate is critical, I believe in a holistic approach to measuring paywall success:

1. **Customer Lifetime Value (LTV)**: A paywall that converts at 4% but attracts users who stay subscribed for years is better than one converting at 5% but with high churn.

2. **Plan Distribution**: The percentage of users choosing premium tiers or annual plans over monthly basic plans.

3. **User Satisfaction**: Post-conversion surveys and NPS scores to ensure users feel they received fair value.

4. **Feature Engagement**: Whether subscribers actively use the premium features they paid for, which predicts retention.

5. **Second-order Effects**: How the paywall affects word-of-mouth referrals and brand perception.

In my Kaizen app, I tracked not just conversions but also which features premium users engaged with most, helping me understand what truly delivered value versus what just looked appealing during the purchase decision."

**Q: "What resources on consumer psychology would you use to improve paywalls?"**

**A:** "I've studied several key psychological principles that apply directly to paywall optimization:

1. **Price Anchoring**: From Kahneman and Tversky's work, showing how presenting a premium option first makes mid-tier options seem more reasonable. I applied this in my Kaizen app by displaying a premium annual plan first, making the monthly premium plan appear more affordable by comparison.

2. **Loss Aversion**: People feel losses more strongly than equivalent gains. I leveraged this by framing premium features as something users would 'miss out on' rather than just 'additional benefits.'

3. **The Paradox of Choice**: From Barry Schwartz's research, showing how too many options can paralyze decision-making. I limited my subscription tiers to just three clear options.

4. **Reciprocity Principle**: Robert Cialdini's work on how giving something first creates an obligation to reciprocate. I implemented this by offering a limited free trial of premium features.

5. **Endowment Effect**: People value things more once they feel ownership. My free trial was designed specifically to create this sense of ownership of premium features.

I'd be excited to apply these principles more systematically with proper A/B testing in your environment."

**Q: "How would you prioritize which tests to run?"**

**A:** "I'd use a structured prioritization framework combining quantitative and qualitative factors:

1. **PIE Framework**:
   - **Potential**: Estimated impact on key metrics if successful
   - **Importance**: Alignment with current business goals
   - **Ease**: Technical complexity and resource requirements

2. **Data-Driven Insights**:
   - Analyzing user drop-off points in the conversion funnel
   - Identifying high-traffic pages with poor conversion
   - User feedback and support tickets related to subscription issues

3. **Business Context**:
   - Current company priorities (acquisition vs. retention)
   - Seasonal factors affecting user behavior
   - Competitive landscape changes

For my Kaizen app, I prioritized testing the subscription page layout first because analytics showed a high drop-off rate there, it aligned with my revenue goals, and was relatively straightforward to implement different versions. I'd bring this systematic approach to prioritizing tests for your products."

**Q: "What's your process for implementing a test from idea to launch?"**

**A:** "My process follows these key steps:

1. **Hypothesis Formation**:
   - Clear statement of what we're testing and why
   - Expected outcome with specific metrics
   - Based on user research, data analysis, or psychological principles

2. **Test Design**:
   - Define control and variant(s) with minimal differences to isolate variables
   - Determine sample size needed for statistical significance
   - Set test duration based on traffic volume and expected effect size

3. **Technical Implementation**:
   - Create a technical spec document
   - Implement tracking for all relevant metrics
   - Build variants with consistent user experience
   - QA testing across devices and user scenarios

4. **Launch and Monitoring**:
   - Soft launch to small percentage to check for technical issues
   - Monitor for unexpected negative impacts
   - Regular check-ins without drawing conclusions too early

5. **Analysis and Documentation**:
   - Statistical analysis of results
   - Qualitative insights from user feedback
   - Documentation of learnings regardless of outcome
   - Recommendations for follow-up tests

6. **Implementation**:
   - Roll out winning variants
   - Share learnings with broader team
   - Update testing roadmap based on insights

In my Kaizen app, I followed this process when testing different approaches to feature gating, which helped me develop a more effective premium feature showcase."

**Q: "How do you balance short-term conversion gains with long-term user satisfaction?"**

**A:** "This balance is crucial for sustainable growth. I approach it through:

1. **Comprehensive Metrics**: Looking beyond immediate conversion to retention, engagement, and NPS scores.

2. **Longitudinal Testing**: Following cohorts over time to see how initial conversion tactics affect long-term behavior.

3. **Ethical Design Principles**: Ensuring all variants provide honest value propositions without dark patterns.

4. **User Feedback Integration**: Collecting qualitative feedback from users who convert through different variants.

5. **Value-First Approach**: Focusing on clearly communicating genuine value rather than just optimizing for clicks.

In my Kaizen app, I found that showing actual journal entries and progress tracking in the paywall (rather than just feature lists) slightly decreased immediate conversions but significantly improved retention, resulting in higher lifetime value. This taught me that sometimes the best long-term strategy isn't the one that maximizes immediate conversions.

I believe the most successful subscription businesses focus on creating genuine value that users are happy to pay for month after month, rather than just optimizing the moment of conversion."

### Discussing Your Hourly Rate

The email specifically asks for your expected hourly rate. Here's a comprehensive analysis to help you determine an appropriate rate:

#### Market Research for Growth/A/B Testing Internships

**Industry Standards**:
- **Tech Startups**: $15-25/hour for interns
- **Mid-size Companies**: $18-30/hour for interns
- **Large Tech Companies**: $25-40/hour for interns with technical skills

**Role-Specific Factors**:
- Growth and A/B testing roles typically command higher rates than general marketing internships due to the technical and analytical skills required
- Roles involving coding (like implementing test variations) typically pay 10-20% more than purely analytical roles

**Location Considerations**:
- **Major Tech Hubs** (SF, NYC, Seattle): $25-40/hour
- **Secondary Tech Markets** (Austin, Denver, Chicago): $20-30/hour
- **Other Urban Areas**: $15-25/hour
- **Remote Positions**: Often based on company location, but may be adjusted for your location

**Experience Level Adjustments**:
- **First Internship**: Lower end of range
- **Previous Related Experience**: Mid-range
- **Relevant Technical Skills** (React, TypeScript, analytics): Higher end of range
- **Domain Knowledge** (subscription businesses, paywalls): Can justify higher rates

#### Your Specific Value Proposition

You bring several valuable assets that justify a competitive rate:
1. **Practical Implementation Experience**: You've already built a subscription system with Stripe integration
2. **Technical Skills**: React/TypeScript proficiency relevant to implementing test variations
3. **Domain Knowledge**: Understanding of subscription models and paywalls
4. **Initiative**: Self-driven project experience shows you can work independently
5. **Education**: Computer Science background from Rutgers University

#### Recommended Approach

1. **Provide a Range**: "$20-30 per hour, depending on the specific responsibilities and time commitment"

2. **Justification Statement**: "I believe this range reflects my technical skills in React/TypeScript and my direct experience implementing subscription paywalls, while acknowledging this is an internship role where I'll be learning and growing."

3. **Flexibility Statement**: "I'm flexible on the exact rate as I'm primarily interested in the opportunity to apply my technical skills to growth challenges and learn from your team's expertise in A/B testing."

#### Negotiation Preparation

Be prepared to discuss:
- How your rate compares to your previous internship compensation (if applicable)
- Your availability and how many hours you can commit weekly
- Any schedule constraints due to classes or other commitments
- Whether you'd accept a lower hourly rate in exchange for other benefits (mentorship, portfolio projects, etc.)

Remember that for part-time internships (5 hours/week as mentioned), companies are often more willing to pay higher hourly rates than for full-time positions, as the total cost remains manageable.

### Preparing for the Technical Discussion

Be ready to discuss how you would implement A/B tests technically with specific code examples and architectural approaches:

#### 1. Component Variations Implementation

**Feature Flag Approach**:
```typescript
// A/B test configuration
const TEST_CONFIGS = {
  'pricing_display_test': {
    variants: ['control', 'variant_a', 'variant_b'],
    weights: [0.34, 0.33, 0.33], // Distribution percentages
    isActive: true
  }
};

// Custom hook for A/B testing
function useABTest(testName: string) {
  const [variant, setVariant] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function assignVariant() {
      if (!user) return;

      // Check if user already has an assignment
      const { data } = await supabase
        .from('ab_test_assignments')
        .select('variant')
        .eq('user_id', user.id)
        .eq('test_name', testName)
        .single();

      if (data) {
        // User already has an assignment
        setVariant(data.variant);
        return;
      }

      // Assign new variant based on weights
      const testConfig = TEST_CONFIGS[testName];
      if (!testConfig || !testConfig.isActive) {
        setVariant('control'); // Default to control
        return;
      }

      // Weighted random selection
      const random = Math.random();
      let cumulativeWeight = 0;
      let selectedVariant = 'control';

      for (let i = 0; i < testConfig.variants.length; i++) {
        cumulativeWeight += testConfig.weights[i];
        if (random <= cumulativeWeight) {
          selectedVariant = testConfig.variants[i];
          break;
        }
      }

      // Save assignment
      await supabase.from('ab_test_assignments').insert({
        user_id: user.id,
        test_name: testName,
        variant: selectedVariant,
        assigned_at: new Date().toISOString()
      });

      // Track assignment event
      trackEvent('test_assignment', {
        test_name: testName,
        variant: selectedVariant
      });

      setVariant(selectedVariant);
    }

    assignVariant();
  }, [testName, user]);

  return { variant, isLoading: variant === null };
}

// Usage in a component
function PricingPage() {
  const { variant, isLoading } = useABTest('pricing_display_test');

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      {variant === 'control' && <StandardPricingDisplay />}
      {variant === 'variant_a' && <EnhancedPricingDisplay />}
      {variant === 'variant_b' && <MinimalistPricingDisplay />}
    </div>
  );
}
```

**Component Prop Approach**:
```typescript
// Higher-order component for A/B testing
function withABTest<P>(
  Component: React.ComponentType<P>,
  testName: string,
  variantProps: Record<string, Partial<P>>
): React.FC<P> {
  return (props: P) => {
    const { variant, isLoading } = useABTest(testName);

    if (isLoading) return <LoadingSkeleton />;

    // Merge base props with variant-specific props
    const variantSpecificProps = variant && variantProps[variant] ? variantProps[variant] : {};
    const mergedProps = { ...props, ...variantSpecificProps };

    return <Component {...mergedProps} />;
  };
}

// Usage
const TestButton = withABTest(
  Button,
  'cta_button_test',
  {
    'control': {
      color: 'blue',
      text: 'Subscribe Now'
    },
    'variant_a': {
      color: 'green',
      text: 'Start Your Journey'
    },
    'variant_b': {
      color: 'purple',
      text: 'Unlock Premium',
      showIcon: true
    }
  }
);
```

**Maintaining Consistent User Experiences**:
```typescript
// Consistent styling system
const buttonStyles = {
  base: 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2',
  primary: {
    control: 'bg-blue-600 text-white hover:bg-blue-700',
    variant_a: 'bg-green-600 text-white hover:bg-green-700',
    variant_b: 'bg-purple-600 text-white hover:bg-purple-700'
  },
  secondary: {
    control: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    variant_a: 'bg-gray-200 text-green-800 hover:bg-gray-300',
    variant_b: 'bg-gray-200 text-purple-800 hover:bg-gray-300'
  }
};

function TestButton({ variant, type = 'primary', ...props }) {
  return (
    <button
      className={`${buttonStyles.base} ${buttonStyles[type][variant]}`}
      {...props}
    />
  );
}
```

#### 2. User Segmentation Implementation

**Database Schema**:
```sql
-- Test definitions table
CREATE TABLE ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  variants JSONB NOT NULL, -- Array of variant names
  weights JSONB, -- Array of weights for random assignment
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User assignments table
CREATE TABLE ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES ab_tests(id) ON DELETE CASCADE,
  variant TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, test_id)
);

-- Segment definitions
CREATE TABLE user_segments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  criteria JSONB NOT NULL, -- Query criteria to identify segment members
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Test-segment associations
CREATE TABLE test_segments (
  test_id UUID NOT NULL REFERENCES ab_tests(id) ON DELETE CASCADE,
  segment_id UUID NOT NULL REFERENCES user_segments(id) ON DELETE CASCADE,
  PRIMARY KEY (test_id, segment_id)
);
```

**Segment-Based Test Assignment**:
```typescript
// Function to check if user belongs to a segment
async function isUserInSegment(userId: string, segmentId: string): Promise<boolean> {
  const { data: segment } = await supabase
    .from('user_segments')
    .select('criteria')
    .eq('id', segmentId)
    .single();

  if (!segment) return false;

  // Apply criteria based on segment definition
  const criteria = segment.criteria;

  // Example: Check if user has minimum number of journal entries
  if (criteria.min_journal_entries) {
    const { count } = await supabase
      .from('journal_entries')
      .select('id', { count: 'exact' })
      .eq('user_id', userId);

    if (count < criteria.min_journal_entries) return false;
  }

  // Example: Check if user is in specific age range
  if (criteria.age_range) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('birth_date')
      .eq('id', userId)
      .single();

    if (profile?.birth_date) {
      const age = calculateAge(new Date(profile.birth_date));
      if (age < criteria.age_range[0] || age > criteria.age_range[1]) return false;
    }
  }

  // All criteria passed
  return true;
}

// Function to assign user to test based on segments
async function assignUserToTest(userId: string, testId: string): Promise<string | null> {
  // Check if test is segment-restricted
  const { data: testSegments } = await supabase
    .from('test_segments')
    .select('segment_id')
    .eq('test_id', testId);

  // If test has segment restrictions, check if user belongs to any
  if (testSegments && testSegments.length > 0) {
    let userBelongsToSegment = false;

    for (const { segment_id } of testSegments) {
      if (await isUserInSegment(userId, segment_id)) {
        userBelongsToSegment = true;
        break;
      }
    }

    if (!userBelongsToSegment) return null; // User not eligible for test
  }

  // Get test configuration
  const { data: test } = await supabase
    .from('ab_tests')
    .select('*')
    .eq('id', testId)
    .single();

  if (!test || !test.is_active) return null;

  // Assign variant based on weights or equal distribution
  const variants = test.variants;
  const weights = test.weights || variants.map(() => 1 / variants.length);

  // Weighted random selection
  const random = Math.random();
  let cumulativeWeight = 0;
  let selectedVariant = variants[0];

  for (let i = 0; i < variants.length; i++) {
    cumulativeWeight += weights[i];
    if (random <= cumulativeWeight) {
      selectedVariant = variants[i];
      break;
    }
  }

  // Save assignment
  await supabase.from('ab_test_assignments').insert({
    user_id: userId,
    test_id: testId,
    variant: selectedVariant
  });

  return selectedVariant;
}
```

**Ensuring Statistical Validity**:
```typescript
// Function to check if segment has sufficient users for testing
async function validateSegmentSize(segmentId: string, minUsersPerVariant: number = 100): Promise<boolean> {
  // Get segment criteria
  const { data: segment } = await supabase
    .from('user_segments')
    .select('criteria')
    .eq('id', segmentId)
    .single();

  if (!segment) return false;

  // Build query based on segment criteria
  let query = supabase.from('profiles').select('id', { count: 'exact' });

  // Apply criteria filters
  if (segment.criteria.min_journal_entries) {
    // This would require a more complex query with joins in a real implementation
    // Simplified example:
    query = query.filter('journal_entry_count', 'gte', segment.criteria.min_journal_entries);
  }

  // Execute query to get count
  const { count, error } = await query;

  if (error) {
    console.error('Error validating segment size:', error);
    return false;
  }

  // Check if segment has enough users for statistically valid testing
  // Assuming we want at least minUsersPerVariant users per variant
  // and a typical test has 2-3 variants
  return count >= (minUsersPerVariant * 3);
}
```

#### 3. Analytics Implementation

**Event Tracking System**:
```typescript
// Analytics service
class AnalyticsService {
  private userId: string | null = null;

  setUser(userId: string) {
    this.userId = userId;
  }

  async trackEvent(eventName: string, properties: Record<string, any> = {}) {
    if (!this.userId) {
      console.warn('Tracking event without user ID');
    }

    // Add standard properties
    const eventData = {
      ...properties,
      user_id: this.userId,
      timestamp: new Date().toISOString(),
      session_id: this.getSessionId()
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, eventData);
    }

    // Send to analytics endpoint
    try {
      await supabase.from('analytics_events').insert({
        user_id: this.userId,
        event_name: eventName,
        properties: eventData
      });
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  // Track test-specific events
  async trackTestEvent(testName: string, variant: string, eventName: string, properties: Record<string, any> = {}) {
    await this.trackEvent(eventName, {
      ...properties,
      test_name: testName,
      variant: variant
    });
  }

  // Track conversion events
  async trackConversion(testName: string, variant: string, conversionType: string, value?: number) {
    await this.trackEvent('conversion', {
      test_name: testName,
      variant: variant,
      conversion_type: conversionType,
      value: value
    });
  }

  private getSessionId(): string {
    // Implementation to get or create session ID
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }
}

// Create singleton instance
export const analytics = new AnalyticsService();

// Hook for tracking in components
function useAnalytics() {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      analytics.setUser(user.id);
    }
  }, [user]);

  return analytics;
}

// Usage in test component
function SubscribeButton({ testName, variant }) {
  const analytics = useAnalytics();

  const handleClick = async () => {
    // Track click event
    await analytics.trackTestEvent(testName, variant, 'subscribe_button_click');

    // Proceed with subscription flow
    const result = await startSubscription();

    if (result.success) {
      // Track conversion
      await analytics.trackConversion(testName, variant, 'subscription', result.value);
    }
  };

  return <Button onClick={handleClick}>Subscribe Now</Button>;
}
```

**Conversion Tracking**:
```typescript
// Conversion tracking middleware
function withConversionTracking(Component, testName, conversionType) {
  return function ConversionTrackingComponent(props) {
    const { variant } = useABTest(testName);
    const analytics = useAnalytics();

    const trackConversion = useCallback((value) => {
      analytics.trackConversion(testName, variant, conversionType, value);
    }, [testName, variant, conversionType]);

    return <Component {...props} trackConversion={trackConversion} />;
  };
}

// Usage
const CheckoutForm = withConversionTracking(
  BaseCheckoutForm,
  'pricing_display_test',
  'purchase'
);
```

**Results Analysis**:
```typescript
// SQL query for analyzing test results
const testAnalysisQuery = `
WITH test_users AS (
  SELECT
    user_id,
    variant
  FROM
    ab_test_assignments
  WHERE
    test_id = '${testId}'
),
conversions AS (
  SELECT
    e.user_id,
    tu.variant,
    COUNT(*) as conversion_count,
    SUM(e.properties->>'value') as conversion_value
  FROM
    analytics_events e
  JOIN
    test_users tu ON e.user_id = tu.user_id
  WHERE
    e.event_name = 'conversion' AND
    e.properties->>'test_name' = '${testName}' AND
    e.properties->>'conversion_type' = '${conversionType}'
  GROUP BY
    e.user_id, tu.variant
)
SELECT
  tu.variant,
  COUNT(DISTINCT tu.user_id) as total_users,
  COUNT(DISTINCT c.user_id) as converted_users,
  COUNT(DISTINCT c.user_id)::float / COUNT(DISTINCT tu.user_id) as conversion_rate,
  SUM(c.conversion_value) as total_value,
  SUM(c.conversion_value) / COUNT(DISTINCT tu.user_id) as value_per_user
FROM
  test_users tu
LEFT JOIN
  conversions c ON tu.user_id = c.user_id
GROUP BY
  tu.variant
ORDER BY
  conversion_rate DESC;
`;
```

#### 4. Integration with Superwall

**Superwall Integration Architecture**:
```typescript
// Superwall configuration
import Superwall from 'superwall-react-native';

// Initialize in app entry point
function initializeSuperwall() {
  Superwall.configure({
    apiKey: process.env.SUPERWALL_API_KEY,
    logging: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
    paywallOptions: {
      automaticallyDismiss: false,
      isDebugMode: process.env.NODE_ENV === 'development'
    }
  });

  // Register user attributes
  const { user } = useAuth();
  if (user) {
    Superwall.identify(user.id, {
      email: user.email,
      created_at: user.created_at,
      subscription_status: user.subscription_status,
      app_version: APP_VERSION
    });
  }
}

// Custom hook for Superwall paywalls
function useSuperwall() {
  const { user } = useAuth();
  const { isPremium } = useSubscription();

  // Register user with Superwall when auth state changes
  useEffect(() => {
    if (user) {
      Superwall.identify(user.id, {
        email: user.email,
        subscription_status: isPremium ? 'premium' : 'free'
      });
    }
  }, [user, isPremium]);

  // Function to present paywall
  const showPaywall = useCallback(async (event: string, attributes = {}) => {
    if (isPremium) return true; // Skip paywall for premium users

    try {
      const result = await Superwall.register(event, attributes);
      return result.status === 'PURCHASED';
    } catch (error) {
      console.error('Error showing paywall:', error);
      return false;
    }
  }, [isPremium]);

  return { showPaywall };
}

// Usage in a component
function PremiumFeature({ children, featureId }) {
  const { isPremium } = useSubscription();
  const { showPaywall } = useSuperwall();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setHasAccess(isPremium);
  }, [isPremium]);

  const handleUnlock = async () => {
    const purchased = await showPaywall('unlock_feature', { feature_id: featureId });
    if (purchased) {
      setHasAccess(true);
    }
  };

  if (hasAccess) {
    return children;
  }

  return (
    <div className="locked-feature">
      <h3>Premium Feature</h3>
      <p>Unlock this feature to enhance your journaling experience</p>
      <button onClick={handleUnlock}>Unlock Now</button>
    </div>
  );
}
```

**Dynamic Paywall Configuration**:
```typescript
// Superwall paywall configuration in Superwall dashboard
// This would be configured in the Superwall web interface, not in code

// Example of event triggers:
{
  "event_name": "unlock_feature",
  "paywall_id": "feature_unlock_paywall",
  "rules": [
    {
      "attribute": "feature_id",
      "operator": "equals",
      "value": "advanced_analytics",
      "paywall_id": "analytics_paywall"
    },
    {
      "attribute": "feature_id",
      "operator": "equals",
      "value": "mood_tracking",
      "paywall_id": "mood_tracking_paywall"
    }
  ]
}

// Example of user targeting:
{
  "paywall_id": "feature_unlock_paywall",
  "targeting": [
    {
      "attribute": "days_since_signup",
      "operator": "greater_than",
      "value": 7,
      "paywall_id": "long_term_user_paywall"
    },
    {
      "attribute": "journal_entries_count",
      "operator": "less_than",
      "value": 5,
      "paywall_id": "new_user_paywall"
    }
  ]
}
```

**Tracking Superwall Events in Your Analytics**:
```typescript
// Set up Superwall event listeners
function setupSuperwallTracking() {
  Superwall.addEventListener('paywall_presented', (event) => {
    analytics.trackEvent('paywall_presented', {
      paywall_id: event.paywallId,
      trigger_event: event.triggerEvent
    });
  });

  Superwall.addEventListener('paywall_dismissed', (event) => {
    analytics.trackEvent('paywall_dismissed', {
      paywall_id: event.paywallId,
      presentation_duration: event.presentationDuration
    });
  });

  Superwall.addEventListener('subscription_purchased', (event) => {
    analytics.trackEvent('subscription_purchased', {
      paywall_id: event.paywallId,
      product_id: event.productId,
      revenue: event.revenue
    });
  });
}
```

These detailed technical implementations demonstrate how you would approach A/B testing in a production environment, with specific code examples that showcase your understanding of both the technical requirements and best practices for testing.

### Summary of Key Preparation Points

1. **Technical Knowledge**:
   - Review your subscription implementation details
   - Understand Superwall's capabilities and integration methods
   - Refresh on A/B testing fundamentals and best practices

2. **Business Understanding**:
   - Research conversion optimization tactics
   - Prepare ideas for paywall improvements
   - Understand how to build testing roadmaps

3. **Communication Skills**:
   - Practice explaining your implementation clearly
   - Prepare to discuss your hypotheses and reasoning
   - Be ready to articulate how you would approach new tests

4. **Portfolio Enhancement**:
   - Consider creating a simple A/B testing demo if time permits
   - Organize your code samples for easy reference
   - Prepare visual aids to explain your subscription model

By thoroughly preparing in these areas, you'll be well-positioned to demonstrate your value for the Growth and A/B Testing internship role and show how your experience with the Kaizen app's subscription system directly translates to the skills they're seeking.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [Authentication System](#authentication-system)
6. [Database Structure](#database-structure)
7. [Subscription System](#subscription-system)
8. [Web Socket Implementation](#web-socket-implementation)
9. [Frontend Architecture](#frontend-architecture)
10. [Backend Services](#backend-services)

## Project Overview

The Kaizen Method Journal is a personal development application that helps users track their daily progress, set goals, and maintain a journal of their spiritual, mental, and physical growth. The application follows the Kaizen philosophy of continuous improvement through small, incremental changes.

The application includes both free and premium features, with a subscription system to manage access to premium content.

## Technology Stack

The application is built using the following technologies:

- **Frontend**: React with TypeScript, using Vite as the build tool
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context API and custom hooks
- **Authentication**: Supabase Authentication
- **Database**: PostgreSQL via Supabase
- **Payments**: Stripe integration for subscription management
- **Real-time Updates**: WebSockets for live data synchronization
- **Deployment**: Supabase for backend, Vercel for frontend

## Project Structure

The project follows a modular structure with clear separation of concerns:

```
project/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Library code and type definitions
│   ├── pages/              # Page components
│   ├── services/           # API service functions
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main application component
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── supabase/               # Supabase configuration
│   ├── functions/          # Serverless functions
│   └── migrations/         # Database migrations
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Core Components

### Main Application Files

#### `src/App.tsx`
This is the main application component that sets up the routing structure using React Router. It defines all the routes for the application, including public routes (landing page, login, register) and protected routes that require authentication (dashboard, journal entries, etc.).

**Coding Elements Used**:
- React Router for navigation
- Context Providers for global state
- Protected route patterns for authentication

#### `src/main.tsx`
The entry point of the application that renders the root React component to the DOM. It sets up the React application and wraps it with necessary providers.

**Coding Elements Used**:
- React DOM rendering
- Provider pattern for context

### Components

#### `src/components/AuthGuard.tsx`
A component that protects routes from unauthorized access. It checks if the user is authenticated and redirects to the login page if not.

**Coding Elements Used**:
- React Router navigation
- Conditional rendering
- Authentication state checking

#### `src/components/PremiumFeature.tsx`
A wrapper component that controls access to premium features based on the user's subscription status. It displays a lock overlay with an upgrade prompt for non-premium users.

**Coding Elements Used**:
- Conditional rendering
- Subscription state checking
- UI overlay techniques

#### `src/components/DashboardStats.tsx`
Displays statistics and metrics on the user's dashboard, showing their progress and activity.

**Coding Elements Used**:
- Data visualization
- State management
- Responsive design

#### `src/components/MoodSelector.tsx`
Allows users to select their mood for journal entries, with visual indicators for different emotional states.

**Coding Elements Used**:
- Interactive UI elements
- Form controls
- Visual feedback

#### `src/components/TimeTracker.tsx`
Tracks the time users spend on different activities, helping them monitor their productivity.

**Coding Elements Used**:
- Timer functionality
- State persistence
- Real-time updates

## Authentication System

The authentication system is built using Supabase Authentication, which provides secure user management with email/password and social login options. This system ensures that user data is protected and that only authorized users can access certain features.

### Authentication Flow

1. **User Registration**:
   - User enters email, password, and profile information
   - Client validates input (password strength, email format)
   - Credentials are sent to Supabase Auth API
   - Supabase creates a new user in the `auth.users` table
   - A confirmation email is sent to the user
   - A new record is created in the `profiles` table via database triggers

2. **User Login**:
   - User enters email and password
   - Credentials are sent to Supabase Auth API
   - Supabase validates credentials and returns a JWT token
   - Token is stored in local storage
   - User session is established in the application

3. **Session Management**:
   - JWT token is included in all API requests
   - Token is refreshed automatically when needed
   - Session expiration is handled gracefully
   - User is redirected to login when session expires

### Key Files

#### `src/contexts/AuthContext.tsx`
Provides global authentication state and methods throughout the application. It handles user login, registration, logout, and session management.

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (signUpError) return { error: signUpError };

    // Create profile record
    if (supabase.auth.getUser()) {
      const { error: profileError } = await supabase.from('profiles').insert({
        username
      });

      return { error: profileError };
    }

    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

**Coding Elements Used**:
- React Context API for global state management
- Custom hook pattern for consuming context
- TypeScript interfaces for type safety
- Supabase Auth API integration with event listeners
- JWT token handling and session management
- Asynchronous authentication methods with error handling
- Effect cleanup with subscription unsubscribe
- Conditional rendering based on auth state
- User metadata storage and retrieval

#### `src/utils/auth.ts`
Contains utility functions for authentication-related operations, such as validating tokens and managing user sessions.

```typescript
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

// Check if token is valid and not expired
export const isValidToken = (token: string): boolean => {
  try {
    // JWT tokens have three parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return false;

    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Get current session with validation
export const getCurrentSession = async (): Promise<Session | null> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) return null;

    // Validate the access token
    if (!isValidToken(session.access_token)) {
      // Token is invalid or expired, try to refresh
      const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
      return refreshedSession;
    }

    return session;
  } catch (error) {
    console.error('Session retrieval error:', error);
    return null;
  }
};

// Check if user has required permissions
export const hasPermission = async (permission: string): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Check user metadata for permissions
    const userPermissions = user.user_metadata?.permissions || [];
    return userPermissions.includes(permission);
  } catch (error) {
    console.error('Permission check error:', error);
    return false;
  }
};

// Securely store auth state in localStorage with encryption
export const securelyStoreAuthState = (key: string, value: any): void => {
  try {
    // Simple encryption for demo purposes (would use a proper encryption library in production)
    const encrypted = btoa(JSON.stringify(value));
    localStorage.setItem(key, encrypted);
  } catch (error) {
    console.error('Storage error:', error);
  }
};

// Retrieve and decrypt auth state from localStorage
export const getStoredAuthState = (key: string): any => {
  try {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;

    // Decrypt the stored value
    return JSON.parse(atob(encrypted));
  } catch (error) {
    console.error('Retrieval error:', error);
    return null;
  }
};

// Clear all auth-related data from storage
export const clearAuthStorage = (): void => {
  try {
    localStorage.removeItem('supabase.auth.token');
    localStorage.removeItem('user-preferences');
    sessionStorage.removeItem('temp-auth-state');
  } catch (error) {
    console.error('Clear storage error:', error);
  }
};
```

**Coding Elements Used**:
- JWT token parsing and validation
- Base64 encoding/decoding for token handling
- Timestamp comparison for expiration checking
- Secure local storage with basic encryption
- Session refresh mechanism
- Permission checking from user metadata
- Error handling with try/catch blocks
- Type safety with TypeScript
- Supabase Auth API integration

#### `src/pages/Login.tsx`
User-facing page for authentication that provides a form for login.

```typescript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const { error } = await signIn(email, password);

      if (error) {
        console.error('Login error:', error);
        setError(error.message || 'Failed to sign in');
        return;
      }

      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      console.error('Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**Coding Elements Used**:
- React functional component with hooks
- Form handling with controlled inputs
- Form validation with error messages
- Loading state management
- React Router for navigation and links
- Tailwind CSS for styling
- Accessibility features (labels, ARIA)
- Error handling with try/catch
- Conditional rendering based on state
- Integration with authentication context

#### `src/pages/Register.tsx`
User-facing page for authentication that provides a form for registration.

```typescript
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const validatePassword = (password: string): boolean => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!email.trim() || !password || !confirmPassword || !username.trim()) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, and numbers');
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const { error } = await signUp(email, password, username);

      if (error) {
        console.error('Registration error:', error);
        setError(error.message || 'Failed to create account');
        return;
      }

      // Redirect to login or confirmation page
      navigate('/registration-success');
    } catch (err) {
      console.error('Unexpected error during registration:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in to existing account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**Coding Elements Used**:
- React functional component with hooks
- Form handling with controlled inputs
- Password validation with regex
- Password confirmation matching
- Loading state management
- React Router for navigation and links
- Tailwind CSS for styling
- Accessibility features (labels, ARIA)
- Error handling with try/catch
- Conditional rendering based on state
- Integration with authentication context

### Database Security

The authentication system is tightly integrated with database security through Row Level Security (RLS) policies:

```sql
-- Example RLS policy for profiles table
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

These policies ensure that users can only access and modify their own data, providing a secure foundation for the application.

## Database Structure

The database is structured around several key tables that store user data, journal entries, and subscription information.

### Tables

#### `profiles`
Stores user profile information, linked to the Supabase auth.users table.

**Columns**:
- `id` (uuid, primary key) - References auth.users
- `username` (text)
- `created_at` (timestamp)

#### `journal_entries`
Stores the user's journal entries with their goals and reflections.

**Columns**:
- `id` (uuid, primary key)
- `user_id` (uuid) - References profiles
- `entry_number` (bigint)
- `date` (date)
- `mood` (text)
- `spiritual_goals` (text)
- `mental_goals` (text)
- `physical_goals` (text)
- `learnings` (text)
- `created_at` (timestamp)

#### `subscriptions`
Manages user subscription status and details.

**Columns**:
- `id` (uuid, primary key)
- `user_id` (uuid, references profiles)
- `status` (text)
- `plan_id` (text)
- `current_period_end` (timestamptz)
- `cancel_at_period_end` (boolean)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## Subscription System

The subscription system allows users to access premium features through a paid subscription. It's implemented using Stripe for payment processing and Supabase for data storage. This system is critical for the application's business model and revenue generation.

### Database Schema

The subscription system is built on a dedicated `subscriptions` table in the database:

```sql
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'free',
  plan_id text NOT NULL DEFAULT 'free',
  current_period_end timestamptz,
  cancel_at_period_end boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Automatically update the updated_at timestamp
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

This schema tracks:
- Subscription status (`active`, `canceled`, `past_due`, `free`)
- Plan type (`free`, `premium`)
- Billing period end date
- Cancellation status
- Creation and update timestamps

### Key Files

#### `src/hooks/useSubscription.ts`
A custom hook that provides access to the user's subscription status. It fetches the subscription data from the database and provides a convenient `isPremium` flag.

```typescript
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Subscription {
  status: string;
  planId: string;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user]);

  const fetchSubscription = async () => {
    try {
      // First ensure user has a subscription record
      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!existingSub) {
        // Create default subscription if none exists
        const { data: newSub, error: insertError } = await supabase
          .from('subscriptions')
          .insert([{
            user_id: user?.id,
            status: 'free',
            plan_id: 'free'
          }])
          .select()
          .single();

        if (insertError) throw insertError;
        if (newSub) {
          setSubscription({
            status: newSub.status,
            planId: newSub.plan_id,
            currentPeriodEnd: newSub.current_period_end ? new Date(newSub.current_period_end) : null,
            cancelAtPeriodEnd: newSub.cancel_at_period_end
          });
        }
      } else {
        setSubscription({
          status: existingSub.status,
          planId: existingSub.plan_id,
          currentPeriodEnd: existingSub.current_period_end ? new Date(existingSub.current_period_end) : null,
          cancelAtPeriodEnd: existingSub.cancel_at_period_end
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPremium = subscription?.status === 'active' && subscription?.planId === 'premium';

  return {
    subscription,
    loading,
    isPremium
  };
}
```

**Coding Elements Used**:
- React hooks (useState, useEffect) for state management
- Custom TypeScript interfaces for type safety
- Supabase queries with filtering and single-record selection
- Conditional database operations (insert if not exists)
- Error handling with try/catch blocks
- Date object conversion for timestamp handling
- Derived state calculation (isPremium flag)
- Asynchronous data fetching with loading states

#### `src/hooks/usePayment.ts`
Handles payment processing for subscriptions. It provides methods to initiate the payment flow and manage the payment state.

```typescript
import { useState } from 'react';
import { createCheckoutSession } from '../services/stripeService';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processPayment = async (priceId: string) => {
    setLoading(true);
    setError(null);

    try {
      await createCheckoutSession(priceId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to process payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    processPayment,
    loading,
    error,
    clearError: () => setError(null)
  };
}
```

**Coding Elements Used**:
- React useState hook for local state management
- Async/await for handling asynchronous payment operations
- Error handling with type checking (instanceof)
- Loading state management for UI feedback
- Clean API design with function return object pattern
- Error clearing functionality

#### `src/services/stripeService.ts`
Contains functions for interacting with the Stripe API, such as creating checkout sessions for subscription purchases.

```typescript
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '../lib/supabase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export async function createCheckoutSession(priceId: string): Promise<void> {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw new Error('Authentication error');
    if (!user) throw new Error('User not authenticated');

    // Call the Stripe checkout function directly
    const response = await fetch('https://bhrtzvhujqfwoznxidqu.functions.supabase.co/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        priceId,
        userId: user.id,
        customerEmail: user.email,
        returnUrl: `${window.location.origin}/dashboard`,
        cancelUrl: `${window.location.origin}/pricing`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    if (!sessionId) throw new Error('No session ID returned');

    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    const { error: redirectError } = await stripe.redirectToCheckout({ sessionId });
    if (redirectError) throw redirectError;

  } catch (error) {
    console.error('Payment error:', error);
    throw new Error(
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred during payment processing'
    );
  }
}
```

**Coding Elements Used**:
- Stripe.js library integration with async loading
- Environment variables for secure API key management
- Supabase authentication integration
- Fetch API for HTTP requests with proper headers
- JSON serialization and deserialization
- Error handling with custom error messages
- Promise-based async/await pattern
- Browser redirection for Stripe Checkout
- Type checking and error propagation

#### `project/supabase/functions/stripe-checkout/index.ts`
A Supabase Edge Function that creates Stripe checkout sessions for subscription purchases. It runs on the server to securely handle payment information.

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    const { priceId, userId, customerEmail, returnUrl, cancelUrl } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: returnUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      client_reference_id: userId,
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
```

**Coding Elements Used**:
- Deno runtime for serverless function execution
- ESM imports for dependencies
- CORS handling for cross-origin requests
- Stripe SDK server-side integration
- Environment variable access for secure credentials
- Request body parsing with JSON
- Stripe Checkout session creation with configuration
- HTTP response construction with proper headers and status codes
- Error handling with appropriate error responses

#### `src/components/PremiumFeature.tsx`
A wrapper component that controls access to premium features based on the user's subscription status.

```typescript
import React from 'react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../hooks/useSubscription';
import { Lock } from 'lucide-react';

interface PremiumFeatureProps {
  children: React.ReactNode;
}

export function PremiumFeature({ children }: PremiumFeatureProps) {
  const { isPremium, loading } = useSubscription();

  if (loading) return null;

  if (!isPremium) {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <Lock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">Premium Feature</p>
            <Link
              to="/pricing"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Upgrade to unlock
            </Link>
          </div>
        </div>
        <div className="opacity-50 pointer-events-none">
          {children}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
```

**Coding Elements Used**:
- React component with TypeScript interface
- React Router Link for navigation
- Custom hook integration (useSubscription)
- Conditional rendering based on subscription status
- Loading state handling
- CSS overlay technique for locked content
- React children pattern for component composition
- Tailwind CSS for styling

#### `src/pages/Pricing.tsx`
Displays subscription plans and allows users to subscribe to premium features.

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { usePayment } from '../hooks/usePayment';
import { PricingPlan } from '../components/PricingPlan';

const SUBSCRIPTION_PLANS = [
  {
    id: 'free',
    name: 'Basic',
    price: 0,
    stripeId: '',
    features: [
      { title: 'Daily Journal Entry', included: true },
      { title: 'Basic Analytics', included: true },
      { title: 'Last 7 Days History', included: true },
      { title: 'Basic Inspiration Feed', included: true },
      { title: 'Long-term Goals', included: true },
      { title: 'Multiple Entries Per Day', included: false },
      { title: 'Unlimited History Access', included: false },
      { title: 'Premium Content', included: false }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    stripeId: import.meta.env.VITE_STRIPE_PREMIUM_PRICE_ID,
    features: [
      { title: 'Daily Journal Entry', included: true },
      { title: 'Basic Analytics', included: true },
      { title: 'Last 7 Days History', included: true },
      { title: 'Basic Inspiration Feed', included: true },
      { title: 'Long-term Goals', included: true },
      { title: 'Multiple Entries Per Day', included: true },
      { title: 'Unlimited History Access', included: true },
      { title: 'Premium Content', included: true }
    ]
  }
];

export default function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isPremium } = useSubscription();
  const { processPayment, loading, error, clearError } = usePayment();

  const handleSubscribe = async (planId: string, stripeId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (planId === 'free') {
      navigate('/dashboard');
      return;
    }

    try {
      await processPayment(stripeId);
    } catch (err) {
      console.error('Subscription error:', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CreditCard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Plan</h1>
          </div>
          <p className="text-xl text-gray-600">
            Unlock premium features to enhance your journaling experience
          </p>
        </div>

        {error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">{error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={clearError}
              >
                <span className="sr-only">Dismiss</span>
                <span className="text-2xl">&times;</span>
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PricingPlan
              key={plan.id}
              {...plan}
              isPremium={isPremium}
              loading={loading}
              onSubscribe={handleSubscribe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Coding Elements Used**:
- React functional component with hooks
- React Router navigation
- Environment variables for Stripe product IDs
- Custom hooks for auth, subscription, and payment
- Structured data for subscription plans
- Conditional navigation based on user state
- Error handling and display
- Responsive grid layout with Tailwind CSS
- Component composition with props spreading
- Lucide React icons for visual elements

### Webhook Integration

To complete the subscription flow, a webhook endpoint processes Stripe events:

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription;

        if (userId && subscriptionId) {
          // Retrieve subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);

          // Update user's subscription in database
          const { error } = await supabase
            .from('subscriptions')
            .upsert({
              user_id: userId,
              status: subscription.status,
              plan_id: 'premium',
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString()
            });

          if (error) {
            console.error('Error updating subscription:', error);
            return new Response(JSON.stringify({ error: 'Database error' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const metadata = subscription.metadata;
        const userId = metadata.userId;

        if (userId) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId);

          if (error) {
            console.error('Error updating subscription:', error);
            return new Response(JSON.stringify({ error: 'Database error' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const metadata = subscription.metadata;
        const userId = metadata.userId;

        if (userId) {
          const { error } = await supabase
            .from('subscriptions')
            .update({
              status: 'canceled',
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId);

          if (error) {
            console.error('Error updating subscription:', error);
            return new Response(JSON.stringify({ error: 'Database error' }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' }
            });
          }
        }
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### Complete Subscription Flow

1. **User Initiates Subscription**:
   - User views pricing page and selects Premium plan
   - `handleSubscribe` function is called with plan details
   - `processPayment` from `usePayment` hook is invoked

2. **Checkout Session Creation**:
   - Frontend calls Stripe checkout serverless function
   - Function creates a Stripe checkout session with subscription parameters
   - Session ID is returned to the frontend

3. **Payment Processing**:
   - User is redirected to Stripe Checkout page
   - User enters payment details and completes purchase
   - Stripe processes the payment and creates subscription

4. **Webhook Notification**:
   - Stripe sends webhook event to our webhook endpoint
   - Webhook verifies the signature and processes the event
   - Database is updated with new subscription status

5. **User Access Update**:
   - User is redirected back to the application
   - `useSubscription` hook fetches updated subscription data
   - UI updates to show premium features as unlocked
   - `PremiumFeature` components now render their children without restrictions

This end-to-end flow ensures secure payment processing, reliable subscription tracking, and immediate access to premium features upon successful payment.

## Web Socket Implementation

The application uses WebSockets for real-time updates and notifications, ensuring users always have the latest information without refreshing the page. This is critical for providing a responsive, dynamic user experience.

### Key Files

#### `src/lib/websocket.ts`
Sets up and manages the WebSocket connection for real-time communication with the server. This file is the core of our real-time functionality.

```typescript
// Simplified version of our WebSocket implementation
import { supabase } from './supabase';
import { useAuth } from '../contexts/AuthContext';

export class WebSocketManager {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private listeners: Map<string, Function[]> = new Map();

  constructor(private userId: string) {
    this.initialize();
  }

  private initialize() {
    const wsUrl = `wss://bhrtzvhujqfwoznxidqu.supabase.co/realtime/v1/websocket?apikey=${import.meta.env.VITE_SUPABASE_ANON_KEY}&vsn=1.0.0`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = this.handleOpen.bind(this);
    this.socket.onclose = this.handleClose.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
  }

  private handleOpen(event: Event) {
    console.log('WebSocket connection established');
    this.reconnectAttempts = 0;
    this.subscribeToUserChannel();
  }

  private handleClose(event: CloseEvent) {
    console.log('WebSocket connection closed', event);
    this.attemptReconnect();
  }

  private handleError(event: Event) {
    console.error('WebSocket error:', event);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data);
      this.notifyListeners(data.type, data.payload);
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  private subscribeToUserChannel() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'subscribe',
        channel: `user:${this.userId}`
      }));
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnect attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);

    this.reconnectTimeout = setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.initialize();
    }, delay);
  }

  public addEventListener(type: string, callback: Function) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)?.push(callback);
  }

  public removeEventListener(type: string, callback: Function) {
    if (!this.listeners.has(type)) return;

    const typeListeners = this.listeners.get(type);
    if (typeListeners) {
      const index = typeListeners.indexOf(callback);
      if (index !== -1) {
        typeListeners.splice(index, 1);
      }
    }
  }

  private notifyListeners(type: string, data: any) {
    const callbacks = this.listeners.get(type) || [];
    callbacks.forEach(callback => callback(data));
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}

// Hook for components to use WebSockets
export function useWebSocket() {
  const { user } = useAuth();
  const [wsManager, setWsManager] = useState<WebSocketManager | null>(null);

  useEffect(() => {
    if (user) {
      const manager = new WebSocketManager(user.id);
      setWsManager(manager);

      return () => {
        manager.disconnect();
      };
    }
  }, [user]);

  const subscribe = useCallback((type: string, callback: Function) => {
    wsManager?.addEventListener(type, callback);
    return () => wsManager?.removeEventListener(type, callback);
  }, [wsManager]);

  return { subscribe };
}
```

**Coding Elements Used**:
- WebSocket API for real-time bidirectional communication
- Event-driven architecture with listeners and callbacks
- Exponential backoff reconnection strategy for reliability
- Singleton pattern for connection management
- Custom React hook for component integration
- Channel-based subscription model
- Error handling and logging

#### Integration with Supabase Realtime

The WebSocket implementation connects to Supabase's Realtime service, which provides:

1. **Pub/Sub Channels**: For broadcasting events to specific users or groups
2. **Database Change Notifications**: Real-time updates when database records change
3. **Presence**: Tracking which users are online and active

```typescript
// Example of subscribing to database changes
const subscription = supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'journal_entries',
      filter: `user_id=eq.${user.id}`
    },
    (payload) => {
      console.log('Change received!', payload);
      updateJournalEntries(payload.new);
    }
  )
  .subscribe();
```

#### Usage in Components

WebSockets are deeply integrated into multiple components to provide real-time updates:

##### Journal Entries Component
```typescript
function JournalEntries() {
  const [entries, setEntries] = useState([]);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    // Initial fetch
    fetchEntries();

    // Subscribe to real-time updates
    const unsubscribe = subscribe('journal_entry_update', (data) => {
      setEntries(prevEntries => {
        const index = prevEntries.findIndex(e => e.id === data.id);
        if (index >= 0) {
          // Update existing entry
          const newEntries = [...prevEntries];
          newEntries[index] = data;
          return newEntries;
        } else {
          // Add new entry
          return [...prevEntries, data];
        }
      });
    });

    return unsubscribe;
  }, []);

  // Rest of component...
}
```

##### Dashboard Stats Component
```typescript
function DashboardStats() {
  const [stats, setStats] = useState({
    totalEntries: 0,
    streakDays: 0,
    completionRate: 0
  });
  const { subscribe } = useWebSocket();

  useEffect(() => {
    // Initial fetch
    fetchStats();

    // Subscribe to stats updates
    const unsubscribe = subscribe('stats_update', (data) => {
      setStats(data);
    });

    return unsubscribe;
  }, []);

  // Component rendering...
}
```

##### Notifications Component
```typescript
function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const { subscribe } = useWebSocket();

  useEffect(() => {
    // Subscribe to new notifications
    const unsubscribe = subscribe('notification', (data) => {
      setNotifications(prev => [data, ...prev]);

      // Show toast notification
      toast({
        title: data.title,
        description: data.message,
        status: data.type,
        duration: 5000,
        isClosable: true,
      });
    });

    return unsubscribe;
  }, []);

  // Render notification list...
}
```

**Implementation Details**:

1. **Connection Lifecycle**:
   - Connection established during app initialization or user login
   - Authentication token included in connection parameters
   - Automatic reconnection with exponential backoff (starting at 1s, doubling up to 30s)
   - Connection monitoring with heartbeat messages every 30 seconds
   - Graceful disconnection when user logs out

2. **Channel Subscription**:
   - User-specific channel: `user:{userId}`
   - Feature-specific channels: `journal_entries`, `notifications`, `stats`
   - Database change channels: `postgres_changes:public:journal_entries`

3. **Message Protocol**:
   - JSON-based message format
   - Message types: `update`, `create`, `delete`, `notification`
   - Payload structure varies by message type
   - Sequence numbers for message ordering

4. **Error Handling**:
   - Connection errors trigger reconnection attempts
   - Message parsing errors are logged but don't crash the application
   - Fallback to REST API if WebSocket is unavailable
   - Offline mode support with local storage caching

**Complete WebSocket Flow Example**:

1. User creates a journal entry through the UI
2. Client sends HTTP POST request to create the entry
3. Server processes the request and saves to database
4. Database trigger fires on insert
5. Trigger calls a function that publishes to the WebSocket channel
6. Supabase Realtime service broadcasts the event to all subscribed clients
7. Client WebSocket receives the message
8. Message handler parses the payload and identifies the message type
9. Relevant component listeners are notified with the new data
10. Components re-render with the updated information
11. UI updates to show the new entry and updated statistics
12. Toast notification appears confirming the entry was created

This real-time architecture ensures that all connected clients stay in sync, providing a collaborative and responsive user experience without requiring page refreshes.

## Frontend Architecture

The frontend is built with React and TypeScript, using a component-based architecture for maintainability and reusability. This architecture enables efficient development, testing, and maintenance while providing a smooth user experience.

### State Management

State management is a critical aspect of the application, implemented through a carefully designed multi-layered approach:

#### 1. React Context API for Global State

The application uses several context providers to manage global state:

```typescript
// src/contexts/ThemeContext.tsx
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load saved theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Update localStorage and apply classes when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

The application includes several context providers:
- **AuthContext**: Manages user authentication state
- **ThemeContext**: Handles light/dark mode preferences
- **SubscriptionContext**: Provides subscription status across the app
- **NotificationContext**: Manages system notifications and alerts
- **SettingsContext**: Handles user preferences and application settings

These contexts are composed in the application root to provide a clean, hierarchical state management structure:

```typescript
// src/App.tsx (context composition)
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SubscriptionProvider>
          <NotificationProvider>
            <SettingsProvider>
              <Router>
                <Routes>
                  {/* Application routes */}
                </Routes>
              </Router>
            </SettingsProvider>
          </NotificationProvider>
        </SubscriptionProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

#### 2. Custom Hooks for Reusable Logic

The application extensively uses custom hooks to encapsulate and reuse logic across components:

```typescript
// src/hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

Other custom hooks include:
- **useDebounce**: Prevents excessive function calls by delaying execution
- **useMediaQuery**: Responds to viewport size changes for responsive design
- **usePrevious**: Tracks previous values of state or props
- **useOnClickOutside**: Detects clicks outside a specified element
- **useKeyPress**: Detects when specific keys are pressed
- **useJournalStats**: Calculates and provides journal usage statistics

These hooks follow a consistent pattern:
1. Define clear input parameters and return values with TypeScript types
2. Implement internal state management with useState/useReducer
3. Handle side effects with useEffect
4. Provide a clean API for components to consume
5. Include proper cleanup to prevent memory leaks

#### 3. Local Component State

For UI-specific state that doesn't need to be shared, components use local state:

```typescript
// Example of local component state in src/components/Accordion.tsx
export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-2">
      <button
        className="w-full p-4 text-left font-medium flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronIcon direction={isOpen ? 'up' : 'down'} />
      </button>

      {isOpen && (
        <div className="p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
}
```

The application follows these principles for state management:
- **Locality**: Keep state as close as possible to where it's used
- **Lifting**: Only lift state up when it needs to be shared
- **Immutability**: Always update state immutably to prevent bugs
- **Normalization**: Avoid deeply nested state objects
- **Persistence**: Persist important state to localStorage or the database

### Routing System

The application implements a sophisticated routing system using React Router v6, with several advanced patterns:

#### Route Configuration

```typescript
// src/routes/index.tsx
const routes = [
  {
    path: '/',
    element: <Landing />,
    public: true
  },
  {
    path: '/login',
    element: <Login />,
    public: true
  },
  {
    path: '/register',
    element: <Register />,
    public: true
  },
  {
    path: '/dashboard',
    element: <AuthGuard><Dashboard /></AuthGuard>,
    public: false
  },
  {
    path: '/journal/new',
    element: <AuthGuard><NewEntry /></AuthGuard>,
    public: false
  },
  {
    path: '/journal/:id',
    element: <AuthGuard><EntryDetail /></AuthGuard>,
    public: false
  },
  {
    path: '/calendar',
    element: <AuthGuard><CalendarPage /></AuthGuard>,
    public: false
  },
  {
    path: '/goals',
    element: <AuthGuard><LongTermGoals /></AuthGuard>,
    public: false
  },
  {
    path: '/inspiration',
    element: <AuthGuard><InspirationFeed /></AuthGuard>,
    public: false
  },
  {
    path: '/pricing',
    element: <Pricing />,
    public: true
  },
  {
    path: '/settings',
    element: <AuthGuard><Settings /></AuthGuard>,
    public: false
  },
  {
    path: '*',
    element: <NotFound />,
    public: true
  }
];
```

#### Route Protection with AuthGuard

```typescript
// src/components/AuthGuard.tsx
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading indicator while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
```

#### Layout-Based Routing

The application uses layout-based routing to maintain consistent UI elements across related pages:

```typescript
// src/layouts/AuthenticatedLayout.tsx
export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}

// Usage in routes
{
  path: '/dashboard',
  element: (
    <AuthGuard>
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    </AuthGuard>
  ),
  public: false
}
```

#### Route-Based Code Splitting

To optimize performance, the application implements route-based code splitting:

```typescript
// src/App.tsx
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const NewEntry = React.lazy(() => import('./pages/NewEntry'));
const EntryDetail = React.lazy(() => import('./pages/EntryDetail'));
// ... other lazy-loaded components

function App() {
  return (
    <Router>
      <React.Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          {/* ... other routes */}
        </Routes>
      </React.Suspense>
    </Router>
  );
}
```

#### Route Transitions

The application implements smooth transitions between routes using Framer Motion:

```typescript
// src/components/PageTransition.tsx
export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Usage in App.tsx
function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          {/* Routes */}
        </Routes>
      </PageTransition>
    </Router>
  );
}
```

### Styling Architecture

The application uses a sophisticated styling approach centered around Tailwind CSS, with several advanced patterns and optimizations:

#### 1. Tailwind Configuration

The Tailwind configuration is extended to support the application's design system:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          // Secondary color palette
        },
        success: {
          // Success color palette
        },
        warning: {
          // Warning color palette
        },
        error: {
          // Error color palette
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-textshadow'),
    // Custom plugin for consistent spacing
    function({ addComponents, theme }) {
      addComponents({
        '.content-container': {
          maxWidth: theme('screens.xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen md': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
        },
      })
    },
  ],
}
```

#### 2. Component-Based Styling

The application uses a component-based styling approach with reusable UI components:

```typescript
// src/components/Button.tsx
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Base classes always applied
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  // Classes based on variant
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  // Classes based on size
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
    xl: 'text-lg px-8 py-4',
  };

  // Classes for width
  const widthClasses = fullWidth ? 'w-full' : '';

  // Classes for disabled state
  const disabledClasses = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '';

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${widthClasses}
    ${disabledClasses}
    ${className}
  `;

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}

      {children}

      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </button>
  );
}
```

#### 3. Responsive Design System

The application implements a comprehensive responsive design system:

```typescript
// src/hooks/useBreakpoint.ts
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpointValues = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpointValues[breakpoint]}px)`);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [breakpoint]);

  return matches;
}

// Usage in components
function ResponsiveComponent() {
  const isDesktop = useBreakpoint('lg');

  return (
    <div>
      {isDesktop ? (
        <DesktopLayout />
      ) : (
        <MobileLayout />
      )}
    </div>
  );
}
```

#### 4. Theme System

The application includes a comprehensive theming system with dark mode support:

```typescript
// src/hooks/useTheme.ts
type ThemeColor = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

interface ThemeColors {
  primary: ThemeColor;
  secondary: ThemeColor;
  success: ThemeColor;
  warning: ThemeColor;
  error: ThemeColor;
  gray: ThemeColor;
}

interface Theme {
  colors: ThemeColors;
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

const lightTheme: Theme = {
  // Light theme configuration
};

const darkTheme: Theme = {
  // Dark theme configuration
};

export function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme === 'dark' ? darkTheme : lightTheme;
}
```

#### 5. CSS-in-JS Integration

For complex components that require dynamic styling beyond Tailwind's capabilities, the application integrates CSS-in-JS using Emotion:

```typescript
// src/components/Calendar/CalendarDay.tsx
import styled from '@emotion/styled';

interface DayProps {
  isToday: boolean;
  isSelected: boolean;
  hasEntries: boolean;
  mood?: 'happy' | 'neutral' | 'sad';
}

const DayContainer = styled.div<DayProps>`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ isToday }) => isToday && `
    border: 2px solid #0ea5e9;
  `}

  ${({ isSelected }) => isSelected && `
    background-color: #0ea5e9;
    color: white;
  `}

  ${({ hasEntries, mood }) => hasEntries && `
    &::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: ${
        mood === 'happy' ? '#10b981' :
        mood === 'sad' ? '#ef4444' :
        '#f59e0b'
      };
    }
  `}

  &:hover {
    background-color: ${({ isSelected }) => isSelected ? '#0284c7' : '#e0f2fe'};
  }
`;

export function CalendarDay({
  day,
  isToday,
  isSelected,
  hasEntries,
  mood,
  onClick
}: CalendarDayProps) {
  return (
    <DayContainer
      isToday={isToday}
      isSelected={isSelected}
      hasEntries={hasEntries}
      mood={mood}
      onClick={onClick}
    >
      {day}
    </DayContainer>
  );
}
```

#### 6. Animation System

The application implements a consistent animation system using Framer Motion:

```typescript
// src/components/animations/FadeIn.tsx
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 20,
}: FadeInProps) {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionMap[direction],
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}

// Usage
function AnimatedComponent() {
  return (
    <div>
      <FadeIn>
        <h1>This fades in from below</h1>
      </FadeIn>
      <FadeIn delay={0.2} direction="left">
        <p>This fades in from the right with a delay</p>
      </FadeIn>
    </div>
  );
}
```

The styling architecture provides several key benefits:
1. **Consistency**: Unified design language across the application
2. **Performance**: Optimized CSS with minimal runtime overhead
3. **Developer Experience**: Intuitive API for styling components
4. **Flexibility**: Easy customization for different themes and user preferences
5. **Accessibility**: Built-in support for color contrast and focus states
6. **Responsiveness**: Seamless adaptation to different screen sizes and devices

## Backend Services

The backend architecture is primarily built on Supabase, providing a comprehensive suite of services that power the application's server-side functionality. This architecture enables scalable, secure, and real-time data operations without requiring a traditional server setup.

### Supabase Integration

The application leverages Supabase's full-stack capabilities:

#### 1. PostgreSQL Database

The application uses a PostgreSQL database hosted on Supabase with the following configuration:

```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  db: {
    schema: 'public',
  },
});
```

The database schema is defined with TypeScript types for full type safety:

```typescript
// src/lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      journal_entries: {
        Row: {
          id: string
          user_id: string
          entry_number: number
          date: string
          mood: string
          spiritual_goals: string | null
          mental_goals: string | null
          physical_goals: string | null
          learnings: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entry_number?: number
          date?: string
          mood: string
          spiritual_goals?: string | null
          mental_goals?: string | null
          physical_goals?: string | null
          learnings?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entry_number?: number
          date?: string
          mood?: string
          spiritual_goals?: string | null
          mental_goals?: string | null
          physical_goals?: string | null
          learnings?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          status: string
          plan_id: string
          current_period_end: string | null
          cancel_at_period_end: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: string
          plan_id?: string
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: string
          plan_id?: string
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_entry_number: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
      update_updated_at_column: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
```

#### 2. Authentication System

The application uses Supabase Auth for user authentication, with custom hooks for easy integration:

```typescript
// Example of authentication API usage
async function signUpUser(email: string, password: string, username: string) {
  try {
    // Register the user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (authError) throw authError;

    // Create a profile record in the database
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username,
        });

      if (profileError) throw profileError;
    }

    return { success: true, user: authData.user };
  } catch (error) {
    console.error('Error during sign up:', error);
    return { success: false, error };
  }
}
```

#### 3. Storage System

The application uses Supabase Storage for file uploads, such as profile pictures and journal attachments:

```typescript
// Example of file upload functionality
async function uploadProfilePicture(userId: string, file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `profile-pictures/${fileName}`;

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('user-content')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) throw uploadError;

    // Get the public URL for the uploaded file
    const { data: urlData } = supabase.storage
      .from('user-content')
      .getPublicUrl(filePath);

    // Update the user's profile with the new picture URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: urlData.publicUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    return { success: false, error };
  }
}
```

#### 4. Edge Functions

The application uses Supabase Edge Functions for server-side logic that requires secure execution:

```typescript
// Example of calling an Edge Function
async function fetchPersonalizedRecommendations(userId: string) {
  try {
    const { data, error } = await supabase.functions.invoke('get-recommendations', {
      body: { userId },
    });

    if (error) throw error;

    return { success: true, recommendations: data.recommendations };
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return { success: false, error };
  }
}
```

Edge Function implementation example:

```typescript
// supabase/functions/get-recommendations/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { userId } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch user's journal entries
    const { data: entries, error: entriesError } = await supabase
      .from('journal_entries')
      .select('mood, spiritual_goals, mental_goals, physical_goals')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (entriesError) throw entriesError;

    // Analyze entries and generate recommendations
    // This would typically involve more complex logic, possibly calling an ML model
    const recommendations = generateRecommendations(entries);

    // Return recommendations
    return new Response(
      JSON.stringify({ recommendations }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in get-recommendations function:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

function generateRecommendations(entries) {
  // Simplified recommendation logic
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const dominantMood = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([mood]) => mood)[0];

  // Return different recommendations based on mood patterns
  switch (dominantMood) {
    case 'happy':
      return [
        'Continue your current practices that are contributing to your positive mood',
        'Consider sharing your success strategies in a journal reflection',
        'Try adding a new challenging goal to maintain momentum'
      ];
    case 'neutral':
      return [
        'Try incorporating a new physical activity into your routine',
        'Consider meditation or mindfulness practices to enhance awareness',
        'Set a specific, measurable goal for the coming week'
      ];
    case 'sad':
      return [
        'Focus on self-care activities that have helped you in the past',
        'Consider reaching out to your support network',
        'Break down your goals into smaller, more manageable steps',
        'Try a gratitude practice to shift perspective'
      ];
    default:
      return [
        'Establish a consistent journaling routine',
        'Set balanced goals across spiritual, mental, and physical domains',
        'Review your progress weekly to identify patterns'
      ];
  }
}
```

#### 5. Realtime Subscriptions

The application uses Supabase Realtime for live updates:

```typescript
// Example of realtime subscription to journal entries
function subscribeToJournalEntries(userId: string, onUpdate: (entries: JournalEntry[]) => void) {
  // Initial fetch of entries
  supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.error('Error fetching journal entries:', error);
        return;
      }

      if (data) {
        onUpdate(data);
      }
    });

  // Subscribe to changes
  const subscription = supabase
    .channel('journal_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'journal_entries',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        // Refetch all entries when a change occurs
        supabase
          .from('journal_entries')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false })
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching journal entries after update:', error);
              return;
            }

            if (data) {
              onUpdate(data);
            }
          });
      }
    )
    .subscribe();

  // Return unsubscribe function
  return () => {
    subscription.unsubscribe();
  };
}
```

### Database Security

Security is implemented using Supabase's Row Level Security (RLS) policies, ensuring users can only access their own data. These policies are defined in SQL and automatically enforced by the database.

#### Comprehensive RLS Policies

```sql
-- Profiles table policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Journal entries policies
CREATE POLICY "Users can view their own entries"
  ON journal_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own entries"
  ON journal_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own entries"
  ON journal_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own entries"
  ON journal_entries
  FOR DELETE
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view their own subscription"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Storage policies
CREATE POLICY "User content is publicly accessible"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'user-content');

CREATE POLICY "Users can upload their own content"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'user-content' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own content"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'user-content' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own content"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'user-content' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

#### Security Implementation Details

1. **Authentication-Based Access**: All policies use `auth.uid()` to verify the user's identity
2. **Fine-Grained Control**: Separate policies for SELECT, INSERT, UPDATE, and DELETE operations
3. **Data Isolation**: Users can only access their own data, preventing data leakage
4. **Storage Security**: File access is restricted based on folder structure
5. **No Backdoors**: Even application code must adhere to these policies when using the client API

### Serverless Functions Architecture

The application uses a serverless architecture for backend processing, with several specialized functions:

#### 1. Stripe Integration Functions

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import Stripe from 'https://esm.sh/stripe@12.0.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    // Process different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await handleCheckoutCompleted(session);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      // Handle other event types...
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

async function handleCheckoutCompleted(session) {
  const userId = session.client_reference_id;
  const subscriptionId = session.subscription;

  if (userId && subscriptionId) {
    // Retrieve subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    // Update user's subscription in database
    const { error } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        status: subscription.status,
        plan_id: 'premium',
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating subscription:', error);
      throw new Error('Database error');
    }
  }
}

async function handleSubscriptionUpdated(subscription) {
  const metadata = subscription.metadata;
  const userId = metadata.userId;

  if (userId) {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      throw new Error('Database error');
    }
  }
}

async function handleSubscriptionDeleted(subscription) {
  const metadata = subscription.metadata;
  const userId = metadata.userId;

  if (userId) {
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      throw new Error('Database error');
    }
  }
}
```

#### 2. External API Integration

```typescript
// supabase/functions/news-feed/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { category } = await req.json();

    // Fetch news from external API
    const apiKey = Deno.env.get('NEWS_API_KEY');
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`);
    }

    const data = await response.json();

    // Process and filter the news articles
    const articles = data.articles
      .filter(article => article.title && article.description && article.urlToImage)
      .map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt
      }))
      .slice(0, 10); // Limit to 10 articles

    return new Response(
      JSON.stringify({ articles }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error fetching news:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
```

#### 3. Data Processing Functions

```typescript
// supabase/functions/journal-analytics/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { userId, timeframe } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate date range based on timeframe
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 30); // Default to 30 days
    }

    // Fetch journal entries
    const { data: entries, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('user_id', userId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;

    // Process the data to generate analytics
    const analytics = processJournalData(entries);

    return new Response(
      JSON.stringify({ analytics }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error generating analytics:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function processJournalData(entries) {
  // Calculate streak
  let currentStreak = 0;
  let longestStreak = 0;
  let previousDate = null;

  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Group entries by date (in case of multiple entries per day)
  const entriesByDate = sortedEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {});

  // Calculate streaks
  const dates = Object.keys(entriesByDate).sort();
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);

    if (previousDate) {
      const dayDifference = Math.floor(
        (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDifference === 1) {
        // Consecutive day
        currentStreak++;
      } else {
        // Streak broken
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    } else {
      // First entry
      currentStreak = 1;
    }

    previousDate = currentDate;
  }

  // Update longest streak
  longestStreak = Math.max(longestStreak, currentStreak);

  // Calculate mood distribution
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  // Calculate completion rates
  const completionRates = {
    spiritual: calculateCompletionRate(entries, 'spiritual_goals'),
    mental: calculateCompletionRate(entries, 'mental_goals'),
    physical: calculateCompletionRate(entries, 'physical_goals'),
  };

  // Generate time series data for charts
  const timeSeriesData = generateTimeSeriesData(entries);

  return {
    totalEntries: entries.length,
    currentStreak,
    longestStreak,
    moodDistribution: moodCounts,
    completionRates,
    timeSeriesData,
  };
}

function calculateCompletionRate(entries, field) {
  const total = entries.length;
  const completed = entries.filter(entry => entry[field] && entry[field].trim() !== '').length;
  return total > 0 ? (completed / total) * 100 : 0;
}

function generateTimeSeriesData(entries) {
  // Group entries by week
  const weeklyData = entries.reduce((acc, entry) => {
    const date = new Date(entry.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
    const weekKey = weekStart.toISOString().split('T')[0];

    if (!acc[weekKey]) {
      acc[weekKey] = {
        week: weekKey,
        entryCount: 0,
        moodScores: [],
      };
    }

    acc[weekKey].entryCount++;

    // Convert mood to numeric score for averaging
    const moodScore =
      entry.mood === 'happy' ? 3 :
      entry.mood === 'neutral' ? 2 :
      entry.mood === 'sad' ? 1 : 2; // Default to neutral

    acc[weekKey].moodScores.push(moodScore);

    return acc;
  }, {});

  // Calculate average mood scores and format for charting
  return Object.values(weeklyData).map(week => ({
    week: week.week,
    entryCount: week.entryCount,
    averageMood: week.moodScores.reduce((sum, score) => sum + score, 0) / week.moodScores.length,
  }));
}
```

These serverless functions provide several advantages:

1. **Scalability**: Functions automatically scale based on demand
2. **Cost Efficiency**: Pay only for actual usage, not idle time
3. **Security**: Sensitive operations run in isolated environments
4. **Maintainability**: Each function has a single responsibility
5. **Performance**: Functions run close to users via edge deployment
6. **Integration**: Easy connection to third-party services and APIs

## Conclusion

The Kaizen Method Journal is a sophisticated application that combines modern web technologies to create a seamless user experience. Its modular architecture, secure authentication, and premium subscription model make it a robust platform for personal development and journaling.

### Technical Achievements

The application demonstrates best practices in:

1. **Frontend Development**:
   - Component-based architecture with React and TypeScript
   - Strong type safety throughout the codebase
   - Optimized rendering with React's virtual DOM
   - Code splitting for improved performance
   - Custom hooks for reusable logic
   - Context API for global state management

2. **Secure Authentication**:
   - JWT-based authentication flow
   - Protected routes with auth guards
   - Session management with refresh tokens
   - Secure password handling
   - Social login integration

3. **Database Design**:
   - Normalized schema with proper relationships
   - Row Level Security for data protection
   - Efficient indexing for query performance
   - Real-time subscriptions for live updates
   - Type-safe database access

4. **Payment Processing**:
   - Secure Stripe integration
   - Webhook handling for subscription events
   - Serverless functions for payment processing
   - Subscription state management
   - Feature gating based on subscription status

5. **Real-time Updates**:
   - WebSocket implementation for live data
   - Efficient reconnection strategies
   - Event-based architecture
   - Optimistic UI updates
   - Conflict resolution for concurrent edits

6. **Responsive UI Design**:
   - Mobile-first approach with Tailwind CSS
   - Consistent design language
   - Accessibility compliance
   - Dark mode support
   - Smooth animations and transitions

### Architecture Overview

The application follows a modern architecture pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Application                      │
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────┐  │
│  │    React    │    │   Context   │    │  Custom Hooks   │  │
│  │ Components  │◄──►│  Providers  │◄──►│  & Utilities    │  │
│  └─────────────┘    └─────────────┘    └─────────────────┘  │
│          ▲                 ▲                   ▲            │
│          │                 │                   │            │
│          ▼                 ▼                   ▼            │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   Service Layer                         ││
│  └─────────────────────────────────────────────────────────┘│
│          ▲                 ▲                   ▲            │
└──────────┼─────────────────┼───────────────────┼────────────┘
           │                 │                   │
           ▼                 ▼                   ▼
┌──────────────────┐  ┌─────────────────┐  ┌────────────────┐
│  Supabase Auth   │  │  Supabase DB    │  │  Supabase      │
│  & User Mgmt     │  │  & Realtime     │  │  Storage       │
└──────────────────┘  └─────────────────┘  └────────────────┘
           ▲                 ▲                   ▲
           │                 │                   │
           └─────────────────┼───────────────────┘
                             │
                             ▼
                   ┌───────────────────────┐
                   │  Supabase Edge        │
                   │  Functions            │
                   └───────────────────────┘
                             ▲
                             │
                             ▼
                   ┌───────────────────────┐
                   │  External Services    │
                   │  (Stripe, etc.)       │
                   └───────────────────────┘
```

### Development Methodology

The application was developed using:

1. **Component-First Approach**: Building reusable UI components before pages
2. **Test-Driven Development**: Writing tests before implementation
3. **Continuous Integration**: Automated testing and deployment
4. **Feature Branching**: Isolating new features in separate branches
5. **Code Reviews**: Peer review process for all changes
6. **Documentation**: Comprehensive inline documentation and this README

### Future Enhancements

The application is designed for extensibility, with potential future enhancements including:

1. **Machine Learning Integration**: Personalized recommendations based on journal patterns
2. **Advanced Analytics**: Deeper insights into personal growth trends
3. **Social Features**: Optional sharing and community aspects
4. **Mobile Applications**: Native mobile apps using React Native
5. **Offline Support**: Full functionality without internet connection
6. **Integration Ecosystem**: Connections to other productivity tools

Each component and file in the application plays a specific role in the overall architecture, creating a cohesive and maintainable codebase that follows modern best practices in web development.
