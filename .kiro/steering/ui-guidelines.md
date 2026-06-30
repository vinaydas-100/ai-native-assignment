# UI Guidelines

- Mobile-first responsive design
- Tailwind CSS only — no inline styles, no CSS modules
- Accessible forms with proper labels, roles, and ARIA attributes
- Keyboard navigation support for all interactive elements
- Loading and empty states must always be handled
- Consistent spacing and typography using Tailwind scale
- Reusable UI components — prefer composition over duplication
- Use theming concept for centralized styling

---

# Theming

- Define color palette, font sizes, and spacing tokens in `tailwind.config.js`
- Never use arbitrary Tailwind values (e.g. `w-[347px]`) unless absolutely necessary
- Reference theme tokens for colors, e.g. `bg-primary`, `text-secondary`
- Keep a single source of truth for brand colors and typography in the Tailwind config

---

# Forms

- Use React Hook Form + Zod for all form state and validation
- Display inline validation errors below each field immediately on blur or submit
- Show a success state or confirmation after successful submission
- Disable submit button while the request is in flight
- Never clear form errors silently — always surface them to the user

---

# Icons

- Use a single icon library consistently across the project (e.g. `react-icons` or `heroicons`)
- Icons used alongside text must have `aria-hidden="true"` and the text must be visible or have a screen-reader label
- Standalone icon buttons must have an `aria-label`

---

# Animations & Transitions

- Prefer Tailwind's built-in transition utilities (`transition`, `duration-200`, `ease-in-out`)
- Keep animations subtle — avoid anything that distracts or delays interaction
- Respect `prefers-reduced-motion` by conditionally disabling animations when the user has set this preference

