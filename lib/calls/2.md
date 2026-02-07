Call Transcript

Call Information
	•	Call ID: 774203981564092311
	•	Title: Follow-Up Review <> Northstar Commerce
	•	Scheduled: 2026-01-25T11:00:00-05:00
	•	Started: 2026-01-25T11:02:03-05:00
	•	Duration: 36m 08s
	•	System: Google Meet

Participants
	•	Alex Moreno (Internal) - alex.moreno@platformco.io - Solutions Architect
	•	Taylor Brooks (Internal) - taylor.brooks@platformco.io - Account Manager
	•	Nina Kapoor (External) - nina.kapoor@northstarcommerce.com - Head of Engineering
	•	Ethan Wallace (External) - ethan.wallace@northstarcommerce.com - Staff Engineer
	•	Jordan Reed (External) - jordan.reed@northstarcommerce.com - Product Lead
	•	Samir Patel (External) - samir.patel@northstarcommerce.com - VP of Technology

Transcript

Small Talk

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:00] Hey everyone — good to see you again. Appreciate you making time for the follow-up.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[00:05] Thanks for setting it up. I wanted to join now that we’ve got some data to look at.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:11] Great timing — we’ve got a much clearer picture than last week.

Call Setup

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:17] Agenda for today: walk through findings, confirm what’s changed, align on expected steady-state usage, then talk next steps.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[00:26] Perfect. We’ve also made a couple of small adjustments since the last call.

Conversation

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:33] Starting with the analysis: we broke usage into three main drivers — compute, data transfer, and cache activity.

[00:40] Compute is up, but largely explained by the higher-performance function tier that Ethan mentioned last time.

[00:47] The bigger surprise was data transfer, especially around image delivery paths.

Ethan Wallace (External, ethan.wallace@northstarcommerce.com, Staff Engineer)

[00:55] That lines up with what we found. We had assets flowing through both the BFF and the CDN.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[01:03] Exactly. In practice, some requests were effectively taking two hops instead of one.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[01:10] If we simplify that path, how much does it move the needle?

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[01:15] Conservatively, we’re estimating a 20–25% reduction in transfer once that’s cleaned up.

Pricing

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:25] Translating that into cost impact: if those changes land, your run rate should drop much closer to the original estimate — still above, but not by a factor of 1.5x.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[01:36] That’s a lot more manageable.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[01:40] And in the meantime? We’re still exposed until the changes are fully rolled out.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:47] Right. Internally, we’ve aligned on providing temporary flexibility while optimizations are in flight.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[01:55] That helps. We just needed confidence that we weren’t absorbing all the risk.

Conversation

Ethan Wallace (External, ethan.wallace@northstarcommerce.com, Staff Engineer)

[02:02] We’ve already downgraded checkout functions in staging and saw no performance regression.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:09] That’s great. Based on metrics, that alone should shave another ~5–8% off compute.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[02:17] So between transfer and compute, we’re talking roughly a third reduction?

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:22] That’s a fair expectation, assuming traffic stays in the current range.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[02:28] We’ve got a campaign in mid-February, but nothing as intense as the launch.

Next Steps

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[02:36] Proposed plan:
[02:38] - You complete the asset routing changes this week.
[02:41] - We monitor usage daily and share a midpoint update.
[02:45] - Once usage stabilizes, we realign on a revised baseline.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:52] I’ll also send a short technical summary with diagrams so everyone’s aligned on what changed.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[02:58] That would be helpful. Let’s also loop finance once we have a clearer steady state.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[03:05] Agreed. This feels like forward progress.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[03:09] Great. Let’s plan to reconnect in about two weeks unless something urgent comes up.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[03:14] Works for us. Thanks, everyone.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[03:17] Thanks all — talk soon.
