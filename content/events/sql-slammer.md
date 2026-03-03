---
slug: "sql-slammer"
title: "SQL Slammer Worm Demonstrates Rapid Propagation"
date: "2003-01-25"
tags: ["malware", "sql-injection", "incident"]
summary: "SQL Slammer exploited a buffer overflow in Microsoft SQL Server, spreading to 75,000 hosts in 10 minutes and demonstrating the speed of modern malware."
references:
  - label: "SQL Slammer Worm Analysis"
    url: "https://en.wikipedia.org/wiki/SQL_Slammer"
  - label: "CERT Analysis of SQL Slammer"
    url: "https://www.cert.org/historical/advisories/CA-2003-04.cfm"
---

The SQL Slammer worm (also known as Sapphire) was released on January 25, 2003, and became one of the fastest-spreading worms in history.

## Technical Details

SQL Slammer exploited a buffer overflow vulnerability (CVE-2002-0649) in Microsoft SQL Server 2000 and MSDE 2000. The vulnerability had been patched six months earlier, but many systems remained unpatched.

Key characteristics:
- Worm was only 376 bytes in size
- Operated entirely in memory (no files written to disk)
- Scanned random IP addresses to find vulnerable systems
- Doubled the number of infected hosts every 8.5 seconds initially

## Impact

Within 10 minutes, SQL Slammer had:
- Infected approximately 75,000 hosts
- Generated massive amounts of network traffic
- Disrupted Internet connectivity globally
- Knocked Bank of America's ATM network offline
- Disrupted 911 emergency services in Seattle

## Security Lessons

SQL Slammer demonstrated several critical lessons:

1. **Patch Management**: A patch existed for 6 months before the attack
2. **Defense in Depth**: Firewalls alone weren't sufficient
3. **Rapid Response**: Traditional incident response was too slow
4. **Network Segmentation**: Lack of segmentation allowed rapid spread
5. **Monitoring**: Many organizations didn't detect the infection quickly

This incident reinforced the importance of timely patching and defense-in-depth strategies that remain fundamental to application security today.
