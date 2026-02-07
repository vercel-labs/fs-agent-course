Call Transcript

Call Information
	•	Call ID: 661984320745118902
	•	Title: Commercial Alignment & Next Phase <> Northstar Commerce
	•	Scheduled: 2026-02-10T13:00:00-05:00
	•	Started: 2026-02-10T13:01:19-05:00
	•	Duration: 41m 02s
	•	System: Google Meet

Participants
	•	Alex Moreno (Internal) - alex.moreno@platformco.io - Solutions Architect
	•	Taylor Brooks (Internal) - taylor.brooks@platformco.io - Account Manager
	•	Nina Kapoor (External) - nina.kapoor@northstarcommerce.com - Head of Engineering
	•	Samir Patel (External) - samir.patel@northstarcommerce.com - VP of Technology
	•	Jordan Reed (External) - jordan.reed@northstarcommerce.com - Product Lead
	•	Claire Donovan (External) - claire.donovan@northstarcommerce.com - Finance Director

Transcript

Small Talk

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:00] Hey everyone — thanks for joining. Feels like we’ve had a lot of momentum since the last call.

Claire Donovan (External, claire.donovan@northstarcommerce.com, Finance Director)

[00:05] Thanks for looping me in. I’ve been catching up on the notes from the previous sessions.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:11] Perfect timing — today should connect the dots between what we found technically and what that means commercially.

Call Setup

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[00:18] Agenda is pretty straightforward: quick recap of what we agreed on in the last two calls, where usage has landed since the changes, and then alignment on next steps.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[00:27] Sounds good. We’ve finished most of the changes we talked about last time.

Conversation

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:33] Just to level-set, in the first call we identified three main drivers: function sizing, asset routing, and cache behavior.

[00:41] In the second call, we focused on the double-hop image delivery and higher-performance functions.

[00:46] Since then, you’ve simplified the asset path and downgraded checkout functions in production.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[00:55] Correct. Those went live early last week.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[00:59] The good news is we can clearly see the impact. Data transfer is down ~23%, and compute has dropped another ~7% compared to the baseline we reviewed in the last call.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[01:12] That lines up with what we’re seeing internally as well.

Pricing

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:18] From a commercial perspective, this puts you much closer to the original estimate we aligned on before launch.

[01:24] You’re still slightly above — roughly 10–12% — but no longer in the 1.5x range we discussed in the first call.

Claire Donovan (External, claire.donovan@northstarcommerce.com, Finance Director)

[01:35] That’s a big difference. The earlier numbers were hard to reconcile with our budget.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[01:41] Exactly, and that’s why we wanted to wait for real data post-optimizations before finalizing anything.

Conversation

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[01:48] Are there any remaining red flags from your side, or does this look like our new normal?

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[01:55] At this point, nothing stands out as abnormal. The remaining variance is consistent with traffic growth and normal usage patterns.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[02:03] We do have a spring campaign coming up. Similar scale to what Jordan mentioned last time.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:09] Right — and based on what we saw during the launch spike, you should expect temporary overages during those peaks, but not sustained ones.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[02:18] That’s acceptable as long as the baseline is predictable.

Next Steps

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[02:25] Given where things landed, here’s what I’d propose:
[02:27] - We formalize the adjusted baseline reflecting the post-optimization usage.
[02:31] - Short-term flexibility remains in place for seasonal spikes, as discussed in the last call.
[02:36] - We schedule a quarterly usage review instead of reactive check-ins.

Claire Donovan (External, claire.donovan@northstarcommerce.com, Finance Director)

[02:44] That works for finance, assuming we document the assumptions clearly.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[02:49] I’ll include a technical appendix referencing the changes we walked through over the last two calls, so there’s a clear audit trail.

Nina Kapoor (External, nina.kapoor@northstarcommerce.com, Head of Engineering)

[02:57] That would be great. This feels like we’ve closed the loop on the original concerns.

Samir Patel (External, samir.patel@northstarcommerce.com, VP of Technology)

[03:03] Agreed. Thanks for sticking with us through the investigation.

Taylor Brooks (Internal, taylor.brooks@platformco.io, Account Manager)

[03:08] Of course. Appreciate the partnership here.

Jordan Reed (External, jordan.reed@northstarcommerce.com, Product Lead)

[03:11] Thanks everyone — looking forward to the next phase.

Alex Moreno (Internal, alex.moreno@platformco.io, Solutions Architect)

[03:14] Thanks all. We’ll follow up with notes and next steps.
