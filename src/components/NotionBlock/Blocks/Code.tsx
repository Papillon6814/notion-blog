import Image from "next/image";
import { useState } from "react";
import type { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { richTextToPlainText } from "@/libs/notion/richTextToPlainText";
import type { BlockWithChildren } from "@/types/notion";

type Props = {
  block: BlockWithChildren<CodeBlockObjectResponse>;
};

const Code = ({ block }: Props) => {
  const plaintext = richTextToPlainText(block.code.rich_text);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    navigator.clipboard.writeText(plaintext).then(() => {
      // If successful, update the isCopied state value
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    });
  };

  return (
    <div className="group relative my-5">
      <pre className="overflow-x-auto whitespace-pre rounded-xl bg-gray-200 p-5 font-mono">
        <code>{plaintext}</code>
      </pre>
      <button
        onClick={handleCopyClick}
        className="group/button absolute top-0 right-0 m-2 rounded-lg bg-white/50 p-2 opacity-0 duration-100 group-hover:opacity-100"
      >
        <span className="absolute -translate-x-1/2 -translate-y-8 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 duration-100 group-hover/button:opacity-80">
          {isCopied ? "Copied!" : "Copy"}
        </span>
        <Image src="copy-icon.svg" alt="copy-icon" width={20} height={20} />
      </button>
    </div>
  );
};

export default Code;
