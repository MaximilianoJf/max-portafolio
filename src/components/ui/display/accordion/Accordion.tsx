import { ChevronDown } from "@gravity-ui/icons";
import { Accordion as HerouiAccordion } from "@heroui/react";
import type { Category } from "../../../../types"
import accordion from "./accordion.module.css"

interface AccordionProps {
    categories: Category[];
}

export function Accordion({ categories }: AccordionProps) {

    return (
        <div className="flex w-full flex-col gap-6">
            {categories.map((category) => (
                <div key={category.title}>
                    <p className="text-md mb-2 font-medium text-muted">{category.title}</p>
                    <HerouiAccordion className={`w-full ${accordion['glass-accordion']}`}>
                        {category.items.map((item, index) => (
                            <HerouiAccordion.Item key={index}>
                                <HerouiAccordion.Heading>
                                    <HerouiAccordion.Trigger>
                                        {item.title}
                                        <HerouiAccordion.Indicator>
                                            <ChevronDown />
                                        </HerouiAccordion.Indicator>
                                    </HerouiAccordion.Trigger>
                                </HerouiAccordion.Heading>
                                <HerouiAccordion.Panel>
                                    <HerouiAccordion.Body className="text-foreground">{item.content}</HerouiAccordion.Body>
                                </HerouiAccordion.Panel>
                            </HerouiAccordion.Item>
                        ))}
                    </HerouiAccordion>
                </div>
            ))}
        </div>
    );
}