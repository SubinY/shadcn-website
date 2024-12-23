"use client";

import { ReactNode, useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
// import LeaderLine from "leader-line-new";

import { cn } from "@/lib/utils";
import { Button } from "./button";

function isServerEnvironment(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[12rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  href2,
  cta2,
  relateId,
  id,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon?: any;
  description: string;
  href: string;
  cta: string;
  href2?: string;
  cta2?: string;
  id?: string;
  relateId?: string[];
}) => {
  useEffect(() => {
    if (!isServerEnvironment()) {
      if (id && relateId?.length) {
        const startElement = window.document.documentElement.querySelector(
          `#${id}`
        ) as any;
        const endElements = relateId.map((endId) =>
          window.document.documentElement.querySelector(`#${endId}`)
        );

        // 第三方非导出react组件的库需要动态引入在useEffect中解决报错问题
        import("leader-line-new").then((LeaderLineModule) => {
          const LeaderLine = LeaderLineModule.default;
          endElements.map(
            (ele) =>
              new LeaderLine(LeaderLine.mouseHoverAnchor(startElement), ele!, {
                dash: true,
              })
          );
        });
      }
    }
  }, [id, relateId]);

  return (
    <div
      key={name}
      id={id}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "!bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className
      )}
    >
      <div>{background}</div>
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
        {Icon && (
          <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
        )}
        <h3 className="text-xl font-semibold text-primary dark:text-neutral-300">
          {name}
        </h3>
        <p className="max-w-lg text-neutral-700">{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        )}
      >
        {href && (
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="pointer-events-auto"
          >
            <a href={href} target="_blank">
              {cta}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
        {href2 && (
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="pointer-events-auto ml-4"
          >
            <a href={href2} target="_blank">
              {cta2}
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };
