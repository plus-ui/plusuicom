"use client";

import React from "react";
import cover from "@assets/images/heros/home/event-card/cover.jpg";

export default function EventCard() {
  return (
    <div className="bg-color-surface border-color-disabled rounded flex flex-col overflow-hidden border h-[24.5rem]">
      {/* Image Header */}
      <div className="relative h-[178px] ">
        <img
          src={cover.src}
          alt="Event Cover"
          className="h-full w-full object-cover"
        />
        <div className="bg-gradient-to-t from-black/30 to-transparent absolute inset-0"></div>

        {/* Date Badge */}
        <div className="bg-color-primary-invert-default text-color-primary absolute right-4 top-[150px] flex h-14 w-14 flex-col items-center justify-center rounded-xl shadow-lg">
          <span className="text-2xl font-semibold leading-7">18</span>
          <span className="text-sm font-normal leading-5 tracking-wide">JAN</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-7">
        <div className="mb-4 space-y-4">
          {/* Chip */}
          <div className="inline-flex">
            <span className="bg-color-info-default text-color-default-invert rounded-full px-2 py-1 text-xs font-normal">
              Dance
            </span>
          </div>

          {/* Title */}
          <div className="space-y-1">
            <p className="text-color-caption text-xs font-normal tracking-wide">
              City Performance Center
            </p>
            <h3 className="text-color-default text-xl font-semibold leading-6">
              Toronto Experimental Dance Festival
            </h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="bg-color-transparent border-color-disabled flex h-8 w-8 items-center justify-center rounded-full border text-color-disabled">
            <i className="fa-regular fa-heart text-sm"></i>
          </button>
          <button className="bg-color-transparent border-color-disabled flex h-8 w-8 items-center justify-center rounded-full border text-color-disabled">
            <i className="fa-solid fa-share text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}