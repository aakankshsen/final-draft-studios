import Reveal from "@/components/Reveal";

const principles = [
  {
    num: "01",
    title: "Lorem ipsum principle title",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
  },
  {
    num: "02",
    title: "Lorem ipsum principle title",
    body: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
  },
  {
    num: "03",
    title: "Lorem ipsum principle title",
    body: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea.",
  },
  {
    num: "04",
    title: "Lorem ipsum principle title",
    body: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
  },
];

export default function Principles() {
  return (
    <section className="px-[5%] py-40 border-b border-white/10">
      <Reveal className="mb-12">
        <h2 className="font-display uppercase text-[clamp(30px,4.5vw,52px)] leading-none">
          How we
          <br />
          work
        </h2>
      </Reveal>

      <div>
        {principles.map((p) => (
          <Reveal
            key={p.num}
            className="flex flex-wrap gap-10 py-11 border-t last:border-b border-white/10 items-start"
          >
            <div className="font-display text-sm text-amber min-w-[50px]">{p.num}</div>
            <h3 className="text-2xl font-bold text-paper min-w-[260px]">{p.title}</h3>
            <p className="text-dim text-[15px] leading-relaxed max-w-[520px]">{p.body}</p>
          </Reveal>
        ))}
      </div>

      <p className="font-mono text-xs text-dim mt-5">
        COPY — Client/team to define 4 real studio principles (how you actually work)
      </p>
    </section>
  );
}