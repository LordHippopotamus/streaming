import { default as NextLink } from "next/link";

const Link = ({
  children,
  href,
  ...rest
}: {
  children: React.ReactNode;
  href: string;
} & React.ComponentPropsWithoutRef<"a">) => {
  return (
    <NextLink
      href={href}
      className="px-4 py-2 rounded bg-slate-500 hover:bg-slate-600 active:bg-slate-700 transition"
      {...rest}
    >
      {children}
    </NextLink>
  );
};

export default Link;
