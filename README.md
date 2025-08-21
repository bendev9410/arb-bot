# ⚾ Arb-Bot – Sports Betting Arbitrage Calculator  


<img width="434" height="269" alt="Screenshot 2025-08-21 at 8 59 25 AM" src="https://github.com/user-attachments/assets/056cc9fd-de5d-4872-9e76-1d60fdc0dd9e" />
<img width="434" height="269" alt="Screenshot 2025-08-21 at 1 11 40 PM" src="https://github.com/user-attachments/assets/d984f241-6097-40a4-9c71-2437e34ec93d" />


## 👉 [Check it out here](https://arb-bot-rho.vercel.app) (May take up to a minute to activate backend during first use)



This is a project I built to explore how arbitrage betting works and to get more hands-on experience with Django and React. The app pulls sportsbook odds, runs the math in the backend, and shows users where they can lock in a guaranteed profit.  

It’s split into two parts:  
- **Backend (Django + DRF):** handles odds, calculations, and exposes an API.  
- **Frontend (React):** a clean interface where you enter your budget/odds and instantly see the results.  

---

## What it does
- Searches almost all sportsbooks from North America.  
- Calculates arbitrage opportunities automatically.  
- Shows how much to place on each side for a guaranteed win.  
- Has a simple, responsive UI.  

---

##  Tech Used
- **Frontend:** React, Axios, Bootstrap/CSS  
- **Backend:** Django, Django REST Framework  
- **Database:** SQLite (local), works with Postgres for production  
- **Deployment:** (Vercel + Render)  

---


## Why I Built It

I’m a big baseball guy, but I’ve also always been curious about the numbers side of sports betting. Arbitrage betting caught my attention because it’s less about “luck” and more about finding mispriced odds across sportsbooks. I figured it would be a fun challenge to build a tool that could crunch those numbers for me.

On top of that, I wanted to get some real world practice with Django REST Framework and React, not just following tutorials, but actually shipping something that connects a backend, frontend, and external APIs. Arb-Bot became that project.

## How It Works

The backend calls odds APIs and gathers the latest lines from different sportsbooks.
It runs some math to check if the odds line up for a guaranteed profit (that’s the “arbitrage” part).
If there’s a match, it calculates exactly how much you should stake on each side.

## What’s Next

This started as a portfolio project, but I’d love to keep improving it. Some things I might add:
More sportsbooks + support for live betting
User accounts with saved searches
Notifications when new opportunities pop up
A cleaner mobile first UI
