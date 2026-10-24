"use client";

import { useId } from "react";

export type TextareaFieldProps = {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export function TextareaField({
  label,
  name,
  placeholder,
  required,
  hint,
  rows = 4,
  value,
  onChange,
}: TextareaFieldProps) {
  const id = useId();

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

      <textarea
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="mt-2 w-full resize-y rounded-xl border border-line bg-surface p-3.5 text-sm leading-6 text-ink shadow-sm transition-all placeholder:text-ink-faint hover:border-ink/20 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:outline-none"
      />
    </div>
  );
}
