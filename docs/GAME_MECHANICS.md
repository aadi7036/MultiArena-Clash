# Game Mechanics Guide

## Game Modes

### Free For All (FFA)
- **Players**: 2-4
- **Objective**: Eliminate opponents and be the last one standing
- **Duration**: 5-10 minutes

### Team Battle (TEAM)
- **Players**: 4-8 (2v2 or 4v4)
- **Objective**: Eliminate opposing team
- **Duration**: 8-15 minutes

### Ranked
- **Players**: Variable
- **Objective**: Climb the competitive ladder
- **Duration**: 5-20 minutes

### Casual
- **Players**: 2-8
- **Objective**: Have fun, minimal stakes
- **Duration**: 5-10 minutes

## ELO Rating System

```
New ELO = Current ELO + K * (Actual Score - Expected Score)
```

### Rank Tiers
- **Novice**: 0-1199 ELO
- **Bronze**: 1200-1399 ELO
- **Silver**: 1400-1599 ELO
- **Gold**: 1600-1799 ELO
- **Platinum**: 1800-1999 ELO
- **Diamond**: 2000-2399 ELO
- **Legend**: 2400+ ELO

## Seasonal System

- **Season Duration**: 30 days
- **Soft Reset**: -300 ELO (minimum 1200)
- **Seasonal Rewards**: Cosmetics, badges, titles
- **Rollover**: Top 100 players recognized in hall of fame

## Anti-Cheat System

Server-side validation for:
- Impossible movement speeds
- Unrealistic hit patterns
- Simultaneous action detection
- Client-server state mismatch