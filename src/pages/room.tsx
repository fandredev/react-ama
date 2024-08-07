import { useParams } from "react-router-dom";

import amaLogo from "../assets/ama-logo.svg";
import { ArrowRight, ArrowUp, Share2 } from "lucide-react";

export function Room() {
  const { roomId } = useParams();

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Codigo da Sala: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button
          type="submit"
          className="bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center transition-colors rounded-lg font-medium text-sm hover:bg-zinc-700"
        >
          Compartilhar
          <Share2 className="size-4" />
        </button>
      </div>

      <div className="h-px w-full bg-zinc-900" />

      <form className="flex items-center gap-2 bg-zinc-900 p-2 rounded-xl border border-zinc-800 ring-orange-400 ring-offset-2 ring-offset-orange focus-within:ring-1">
        <input
          type="text"
          name="theme"
          placeholder="Qual a sua pergunta?"
          autoComplete="off"
          className="flex-1 text-sm mx-2 bg-transparent outline-none placeholder:text-zinc-500 text-zinc-100"
        />
        <button
          type="submit"
          className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center transition-colors rounded-lg font-medium text-sm hover:bg-orange-500"
        >
          Criar pergunta
          <ArrowRight className="size-4" />
        </button>
      </form>

      <ol className="list-decimal list-outside px-4 space-y-8">
        <li className="ml-4 text-zinc-100 leading-relaxed">
          O que é Lorem Ipsum?
          <button
            type="button"
            className="flex items-center mt-3 gap-2 text-orange-400 text-small font-medium hover:text-orange-500"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (15)
          </button>
        </li>
        <li className="ml-4 text-zinc-100 leading-relaxed">
          O que é Lorem Ipsum?
          <button
            type="button"
            className="flex items-center mt-3 gap-2 text-zinc-400 text-small font-medium hover:text-zinc-300"
          >
            <ArrowUp className="size-4" />
            Curtir pergunta (15)
          </button>
        </li>
      </ol>
    </div>
  );
}
