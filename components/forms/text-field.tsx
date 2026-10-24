"use client";

import { useId, useState } from "react";
import { Eye, EyeOff, type LucideIcon } from "lucide-react";

export type TextFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password" | "tel" | "date";
  placeholder?: string;
  autoComplete?: string;
  icon?: LucideIcon;
  required?: boolean;
  autoFocus?: boolean;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  icon: Icon,
  required,
  autoFocus,
  hint,
  value,
  onChange,
}: TextFieldProps) {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="group">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
          {required ? <span className="ml-1 text-danger">*</span> : null}
        </label>
        {hint ? (
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-muted">
            {hint}
          </span>
        ) : null}
      </div>

      <div className="relative mt-2">
        {Icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className="size-4 text-ink-muted transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
          </div>
        ) : null}

        <input
          id={id}
          name={name}
          type={isPassword && reveal ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          autoFocus={autoFocus}
          value={value}
          onChange={onChange}
          className={`h-11 w-full rounded-xl border border-line bg-surface pr-4 text-sm text-ink shadow-sm transition-all placeholder:text-ink-faint hover:border-ink/20 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:outline-none ${
            Icon ? "pl-10" : "pl-3.5"
          } ${isPassword ? "pr-11" : ""}`}
        />

        {isPassword ? (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-muted transition-colors hover:text-ink focus:outline-none"
          >
            {reveal ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
