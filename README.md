## Notes on Implementation 🚀

### 🛠️ Initial Setup

I initially ran into an issue getting the project to run locally where the `index.html` file was inside the `public` folder rather than at the root of the project, which caused problems with the Vite setup. I moved it to the root directory and that seemed to fix this. I'm not sure if this was intentional as part of the test or just a small oversight, but I thought it's worth flagging just in case 👀

To move a bit faster, I added Tailwind CSS and HeadlessUI for styling and accessible UI primitives (modals, form fields, buttons). I remember you (Jonny) mentioning that you guy also using Tailwind so I hope this isn't an issue!

---

### ⚙️ Backend

I started with the backend and I have implemented:

* A `priority` field (low, medium, high)
* A `dueDate` field stored as an ISO string, with format validation on input
* Query parameters for filtering tasks (`?priority=high`, `?completed=true`, `?dueDate=...`), with all filter values validated before use
* Improved input validation, all returning `400` with descriptive error messages

I did spend a bit more time on the backend than I probably should have. It’s not something I work with every day in my current role, so backend filtering somewhat new to me. That said, I really enjoyed it and would like to keep building more experience in this area.

---

### 🎨 Frontend

On the frontend, I...

* Added a personal title and today's date in a Header, along with a `ProgressBar` component showing both a visual bar and a fraction counter (_not asked but I thought this was fun!_)
* Added a custom checkbox component to toggle task completion
* Created colour-coded badge component: red for high, amber for medium, green for low
* Displayed due dates via a DueDateBadge component with a calendar icon and locale-formatted date
* Implemented a priority selector and date picker when creating or editing tasks
* Moved task creation and editing into a single reusable TaskFormModal, with a separate
* `DeleteConfirmModal` for destructive actions
* Added a `FilterBar` with tab-based completion filters (All / Active / Done) and a priority dropdown, feeding query parameters directly to the API
* Built a dedicated API layer (`src/api.ts`) with a shared handleResponse utility for consistent error handling across all fetch calls
* Defined shared TypeScript types (`src/types.ts`) used across both frontend and backend, including derived types like NewTask and UpdateTask to prevent accidental mutation of id or createdAt

I also spent time on overall styling and layout to make the app feel polished: responsive design with a mobile-first approach, a `Header` showing the current date, and consistent use of Tailwind utility classes throughout.

---

### ⏳ If I Had More Time

I already took a lot more time than the 2h suggested but if I had EVEN MORE time, I would...
* Add sorting (by priority and due date) via a select input to be consistent with the existing filter UI
* Implement optimistic UI updates for a smoother experience on toggle/delete
* Persist tasks using localStorage or (even better) a database
* Add some unit tests for key components and API logic to validate my changes but also to guard against any future regressions
* Maybe also add some pagination in case we get thousands of tasks, which would otherwise put unnecessary strain on the database and impact performance.
* Thanks to Tailwind and HeadlessUI it is relatively responsive, but I could spend more time ensuring the experience on small screens (like a phone or tablet) is just as good as it is on desktop

---

### 🔧 Improvements

* Maybe I could refactor a bit further for better separation of concerns and reusability and also improve accessibility (keyboard navigation, form interactions).
* The state management could also be improved as currently all state lives in App.tsx, so I think extracting it into a custom hook or context would make the app easier to scale in the future.


---
