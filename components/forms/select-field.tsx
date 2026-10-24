"use client";

import { useId } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

export type SelectFieldProps = {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  hint?: string;
  icon?: LucideIcon;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectField({
  label,
  name,
  options,
  placeholder = "Select an option",
  required,
  hint,
  icon: Icon,
  value,
  onChange,
}: SelectFieldProps) {
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

      <div className="relative mt-2">
        {Icon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            <Icon
              className="size-4 text-ink-muted transition-colors group-focus-within:text-primary"
              aria-hidden="true"
            />
          </div>
        ) : null}

        <select
          id={id}
          name={name}
          defaultValue={value !== undefined ? undefined : ""}
          value={value}
          onChange={onChange}
          required={required}
          className={`h-11 w-full appearance-none rounded-xl border border-line bg-surface pr-10 text-sm text-ink shadow-sm transition-all hover:border-ink/20 focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10 focus:outline-none ${
            Icon ? "pl-10" : "pl-3.5"
          }`}
        >
          <option value="" disabled className="text-ink-faint">
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted transition-colors group-focus-within:text-primary"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
