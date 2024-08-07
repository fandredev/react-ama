import { useNavigate } from "react-router-dom";
import amaLogo from "../assets/ama-logo.svg";

import { ArrowRight } from "lucide-react";

export function CreateRoom() {
  const navigate = useNavigate();

  function handleCreateRoom() {
    navigate("/room/123");
  }

  return (
    <main className="h-screen flex items-center justify-center px-4">
      <div className="max-w-[450px] flex flex-col gap-6">
        <img src={amaLogo} alt="AMA Logo" className="h-10" />

        <p className="leading-relaxed text-zinc-300 text-center">
          Crie uma sala pública de AMA (Ask Me Anything) e compartilhe o link
          com a sua audiência.
        </p>

        <form
          action={handleCreateRoom}
          className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-orange focus-within:ring-1"
        >
          <input
            type="text"
            name="theme"
            placeholder="Nome da sala"
            autoComplete="off"
            className="flex-1 text-sm mx-2 bg-transparent outline-none placeholder:text-zinc-500 text-zinc-100"
          />
          <button
            type="submit"
            className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center transition-colors rounded-lg font-medium text-sm hover:bg-orange-500"
          >
            Criar sala
            <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </main>
  );
}
