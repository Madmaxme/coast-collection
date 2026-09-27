"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

type AddToCartProps = {
  slug: string;
  sizes: readonly string[];
  sizeLabel: string;
  quantityLabel: string;
  decreaseLabel: string;
  increaseLabel: string;
  addLabel: string;
};

export function AddToCart({
  slug,
  sizes,
  sizeLabel,
  quantityLabel,
  decreaseLabel,
  increaseLabel,
  addLabel,
}: AddToCartProps) {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const needsSize = sizes.length > 0;

  return (
    <form
      className="mt-8 flex max-w-sm flex-col gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (needsSize && !size) return;
        addToCart({ slug, size: needsSize ? size : "", quantity });
      }}
    >
      {needsSize ? (
        <fieldset>
          <legend className="mb-2 text-[12px] text-ink/70">{sizeLabel}</legend>
          <div className="flex flex-wrap gap-2">
            {sizes.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={size === option}
                className={`min-h-11 min-w-11 border px-3 text-[13px] ${
                  size === option ? "border-ink text-ink" : "border-craft/30 text-ink/70"
                }`}
                onClick={() => setSize(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}
      <div>
        <p className="mb-2 text-[12px] text-ink/70">{quantityLabel}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="min-h-11 min-w-11 border border-craft/30 text-[15px]"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            aria-label={decreaseLabel}
          >
            −
          </button>
          <span className="min-w-8 text-center text-[15px]">{quantity}</span>
          <button
            type="button"
            className="min-h-11 min-w-11 border border-craft/30 text-[15px]"
            onClick={() => setQuantity((value) => value + 1)}
            aria-label={increaseLabel}
          >
            +
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={needsSize && size === ""}
        className="flex min-h-11 items-center justify-center border border-craft/40 text-[13px] tracking-wide uppercase disabled:opacity-40"
      >
        {addLabel}
      </button>
    </form>
  );
}
