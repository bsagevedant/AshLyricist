interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-t py-6 md:py-0 ${className}`}>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground">
          All lyrics are AI-generated.
        </p>
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} AshLyricist
        </p>
      </div>
    </footer>
  );
}