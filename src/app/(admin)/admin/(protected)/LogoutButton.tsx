'use client';

import { logoutAction } from './actions';

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition hover:border-red-500/40 hover:text-red-300"
      >
        Выйти
      </button>
    </form>
  );
}
