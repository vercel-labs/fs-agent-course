Call Transcript

Call Information
	•	Call ID: 908374561209348756
	•	Title: Platform Review <> Northstar Commerce
	•	Scheduled: 2026-01-18T10:00:00-05:00
	•	Started: 2026-01-18T10:01:42-05:00
	•	Duration: 28m 54s
	•	System: Google Meet

Participants
	•	Alex Moreno (Internal) - alex.moreno@platformco.io - Solutions Architect
	•	Taylor Brooks (Internal) - taylor.brooks@platformco.io - Account Manager
	•	Nina Kapoor (External) - nina.kapoor@northstarcommerce.com - Head of Engineering
	•	Ethan Wallace (External) - ethan.wallace@northstarcommerce.com - Staff Engineer
	•	Jordan Reed (External) - jordan.reed@northstarcommerce.com - Product Lead

Transcript

Small Talk

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:00] Hey everyone, thanks for jumping on. How’s everyone doing today?

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[00:06] Doing well, just came out of back-to-back meetings, so this is a nice change.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:12] Always happy to be the calm meeting in the middle of the storm.

Call Setup

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:19] Quick plan for today: review recent usage, talk through what changed, and align on next steps.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[00:27] Sounds good. I might be mostly listening, but happy to jump in if needed.

Conversation

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[00:35] We noticed a sharp increase in usage after the homepage and PDP rollout last week.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:43] Yep, we saw that on our side too and pulled a usage report covering the last two weeks.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:51] From an architecture standpoint, nothing looks broken, but there are a few places where requests may be fanning out more than expected.

Ethan Wallace (External, ethan.wallace@northstarcommerce.com, Staff Engineer)

[01:01] Could that be tied to ISR settings? We increased revalidation during launch week.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[01:09] Yes, that could definitely contribute, especially if multiple pages are revalidating at once.

Pricing

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[01:18] The concern on our side is budget predictability. We planned around the estimates we aligned on.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:25] Totally understood. Based on current trends, usage is tracking about 1.5x higher than expected.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[01:33] That’s not something we can absorb long-term without changes.

Conversation

Ethan Wallace (External, ethan.wallace@northstarcommerce.com, Staff Engineer)

[01:40] One thing to flag: we switched some server functions to a higher performance tier before launch.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[01:48] That explains part of it, though it’s likely only a portion of the overall increase. We’ll quantify how much.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:56] We also want to double-check bot traffic and asset delivery paths to rule out duplication.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[02:04] We’re open to that. We’ve been conservative with bot blocking so far.

Next Steps

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:12] Proposed next steps:
[02:14] - Break down usage by compute, caching, and data transfer.
[02:18] - Review recent config changes and test downgrading where safe.
[02:22] - Map request flows to identify any redundant hops.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[02:30] I’ll also take an internal action to explore short-term flexibility while we gather data.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[02:37] That would help a lot. When should we regroup?

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:41] Let’s reconnect end of next week with findings and recommendations.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[02:46] Sounds good. Thanks, everyone.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[02:49] Thanks all — talk soon.
