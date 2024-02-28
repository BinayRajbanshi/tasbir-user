import { motion } from 'framer-motion';
import { navVariants } from '@/_utils/animations/animation';
import Link from 'next/link';

const NoChildrenItems = ({
  name,
  route,
  icon,
  className,
}: {
  className?: string;
  name: string;
  route: string;
  icon: string | null;
}) => {
  return (
    <motion.div variants={navVariants}>
      <Link className={`flex items-center gap-2 ${className}`} href={route}>
        <p>{name}</p>
      </Link>
    </motion.div>
  );
};
export default NoChildrenItems;
