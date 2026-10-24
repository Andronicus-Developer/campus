import { Reveal } from "@/components/marketing/reveal";
import { Container, Eyebrow } from "@/components/site/primitives";
import { roles } from "@/lib/site-content";

const roleColors = [
  "bg-primary-light text-primary border-primary/20",
  "bg-accent-light text-accent border-accent/20",
  "bg-success-light text-success-deep border-success/20",
  "bg-orange-light text-orange border-orange/20",
  "bg-warning-light text-warning border-warning/20",
  "bg-primary-light text-primary border-primary/20",
  "bg-accent-light text-accent border-accent/20",
  "bg-success-light text-success-deep border-success/20",
];

export function Roles() {
  return (
    <section id="roles" className="scroll-mt-24 border-b border-line bg-surface">
      <Container className="py-20 lg:py-28">
        <Reveal>
          <Eyebrow>Built around real school roles</Eyebrow>
          <h2 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
            Every person sees exactly what they need.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-ink-muted">
            One school, eight audiences. Assign permissions once and every screen adapts
            to the person looking at it — from the platform admin down to the student
            checking a timetable.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <Reveal key={role.name} delay={(index % 4) * 60} className="h-full">
              <article className="card-lift flex h-full flex-col rounded-2xl border border-line bg-canvas p-6">
                <span
                  className={`grid size-10 place-items-center rounded-xl border ${roleColors[index % roleColors.length]}`}
                >
                  <role.icon className="size-4.5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{role.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{role.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
