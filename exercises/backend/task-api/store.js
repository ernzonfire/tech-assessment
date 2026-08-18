/** In-memory domain store. Make these tests green before writing routes. */

export function createTaskStore(seed = []) {
  // TODO: Keep state private. Do not expose the mutable internal array.

  return {
    list(filters = {}) {
      // TODO: Return copies. Support filters.completed boolean.
    },

    get(id) {
      // TODO: Return a copy or null.
    },

    create(input) {
      // TODO: Validate/trim title and return a newly created task.
      // Use crypto.randomUUID() and new Date().toISOString().
    },

    update(id, changes) {
      // TODO: Allow title and completed only. Return updated copy or null.
    },

    remove(id) {
      // TODO: Return true when removed and false when not found.
    },
  };
}

