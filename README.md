# SkillSwap

SkillSwap is a freelance micro-task marketplace that connects clients who need work done with freelancers who can do it. Clients post tasks, freelancers submit proposals, and once a proposal is accepted, payment is securely processed before work begins.

**Live site:** https://skillswap-client-ruby.vercel.app

## Overview

SkillSwap supports three roles, each with its own dashboard and workflow:

- **Clients** post tasks, review incoming proposals, accept or reject them, and track work through to completion.
- **Freelancers** browse open tasks, submit proposals with their bid and timeline, and manage active projects through to delivery.
- **Admins** oversee the platform — managing users, monitoring tasks, and reviewing transactions across the marketplace.

## Core Features

- **Authentication & Roles** — Secure sign-up and sign-in with role-based access (client, freelancer, admin) powered by Better Auth.
- **Task Management** — Clients can create, edit, and delete tasks; freelancers can browse and filter open tasks by category.
- **Proposals** — Freelancers submit proposals on tasks; clients can accept (which automatically rejects competing proposals on the same task) or reject them.
- **Secure Payments** — Accepting a proposal routes the client through a Stripe checkout session before the task moves to "in progress," ensuring funds are committed upfront.
- **Deliverables** — Freelancers submit a deliverable link to mark a task as completed, after which earnings are reflected in their dashboard.
- **Admin Controls** — Admins can view platform-wide stats, manage and block/unblock users, delete tasks that violate guidelines, and review all completed transactions.
- **Dashboards** — Each role gets a tailored dashboard summarizing relevant stats: open/in-progress/completed tasks, pending proposals, earnings, and platform-wide metrics for admins.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, HeroUI
- **Backend:** Express.js, MongoDB
- **Authentication:** Better Auth
- **Payments:** Stripe Checkout
- **Deployment:** Vercel (frontend and backend)

## Project Structure

The project is split into two parts:

- **Client** — A Next.js application handling routing, UI, authentication, and server actions that communicate with the backend API.
- **Server** — An Express API backed by MongoDB, exposing endpoints for tasks, proposals, profiles, stats, and admin operations. Protected routes are secured via session-token verification tied to the authenticated user.

## Status

Actively developed and deployed. Core flows for all three roles — task posting, proposal management, payments, and deliverable submission — are functional end to end.
