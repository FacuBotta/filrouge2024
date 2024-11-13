import IconWrapper from '@/components/ui/IconWrapper';

export default function NavMenuButton() {
  return (
    <IconWrapper
      type="burgerMenu"
      className="hover:animate-swing"
      width={30}
      strokeWidth={1.5}
    />
  );
}
