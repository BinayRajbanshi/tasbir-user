import { motion } from 'framer-motion';
import { navVariants } from '@/_utils/animations/animation';
import Link from 'next/link';
import Icon from '@/_components/ui/dynamic-icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/_components/ui/accordion';
import { MenuT } from '@/_types/menuTypes';
import NoChildrenItems from './NoChildrenItems';

const ChildrenItems = ({
  childrenItem,
  name,
  icon,
}: {
  childrenItem: MenuT[] | undefined;
  name: string;
  icon?: any;
}) => {
  return (
    <motion.div className="" variants={navVariants}>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex">
              {/* <Icon name="laptop" /> */}
              <p> {name}</p>
            </div>
          </AccordionTrigger>
          {childrenItem?.map((item) => {
            if (item.children) {
              return (
                <AccordionContent>
                  <ChildrenItems childrenItem={item.children} name={item.name} />
                </AccordionContent>
              );
            } else {
              return (
                <AccordionContent>
                  <NoChildrenItems
                    className="pb-2 text-muted-foreground"
                    name={item.name}
                    route={item.route}
                    icon={item.icon}
                  />
                </AccordionContent>
              );
            }
          })}
        </AccordionItem>
      </Accordion>
    </motion.div>
  );
};
export default ChildrenItems;
