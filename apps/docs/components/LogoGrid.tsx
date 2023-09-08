import Grid from "../components/Grid";
import Image from "next/image";

interface LogoItem {
  link: string;
  src: string;
  alt: string;
  label: string;
}

interface GridProps {
  cols?: number;
  spacing?: number;
  items: LogoItem[];
}

const LogoGrid = ({ cols = 6, spacing = 3, items }: GridProps) => {
  return (
    <Grid cols={cols} spacing={spacing}>
      {items.map(({ link, src, alt, label }) => (
        <LogoWithText
          link={link}
          src={src}
          alt={alt}
          label={label}
          key={`${link}#${src}`}
        />
      ))}
    </Grid>
  );
};

const LogoWithText = ({ link, alt, src, label }: LogoItem) => {
  return (
    <article>
      <a href={link} className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="h-16 w-16 object-contain" src={src} alt={alt} />
        <p className="my-1">{label}</p>
      </a>
    </article>
  );
};

export default LogoGrid;
