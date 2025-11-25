Title: feat(ui): add confirm-delete modal for cast deletion

Summary

This PR adds an in-app confirmation step before deleting a saved cast. When a user clicks "Delete" on a cast (in the main list or search results), a modal appears asking the user to confirm the deletion. This prevents accidental deletions and keeps destructive actions explicit.

What I changed

- `src/components/CastList.tsx`
  - Added state to track which cast is pending deletion (`confirmDeleteCast`).
  - Wire existing Delete buttons to open the confirm modal instead of calling `handleDelete` directly.
  - Added a small confirmation modal (reuses existing `Modal` component) with Cancel/Delete actions.
  - The Delete action calls `handleDelete` with the selected cast and closes the modal.

Why

- Prevents accidental data loss.
- Keeps UI consistent by reusing the existing `Modal` component and `Button` component.
- Preserves keyboard accessibility (Cancel/Close actions available, focusable buttons).

How to test

1. Run the dev server: `npm run dev` (Node 22 recommended).
2. Go to Casts page.
3. Click Delete on any cast in the main list or on a search result.
4. Verify a confirmation modal appears with the message: "Are you sure you want to delete \"{title}\"?"
5. Click Cancel: modal closes and cast remains.
6. Click Delete: the app calls `handleDelete` and the cast is removed.

Notes

- The confirmation modal's Delete button includes hover and focus indicators to match other destructive controls.
- This PR intentionally uses the in-app `Modal` for styling consistency. If I later add a global confirm component, I can refactor.
