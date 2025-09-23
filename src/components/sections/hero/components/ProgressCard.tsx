"use client";

import React from "react";

export default function ProgressCard() {
  // Progress matrix data - each row represents different roles (UI, UX, DS, HR, QA)
  // Each column represents experience levels (Trainee, 3-5 years, 5+ years)
  const progressData = [
    { role: "UI", progress: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { role: "UX", progress: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { role: "DS", progress: [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { role: "HR", progress: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0] },
    { role: "QA", progress: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ];

  return (
    <div className="bg-color-surface rounded border border-color-default h-[25.3125rem] flex flex-col">
      <div className="py-4 px-5 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-color-default text-lg font-semibold">
            Corporation
          </h4>
          <div className="text-color-default">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>

        {/* Description */}
        <div className="mb-2">
          <p className="text-color-default text-sm">
            This chart shows the progress of the sector distribution.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-color-default mb-0"></div>

        {/* Progress Chart */}
        <div className="flex-1 relative bg-color-surface rounded-3xl p-5 mb-0">
          {/* Progress Title */}
          <div className="mb-4">
            <h5 className="text-color-default text-sm font-semibold">Progress</h5>
          </div>

          {/* Progress Matrix */}
          <div className="space-y-0">
            {progressData.map((roleData) => (
              <div key={roleData.role} className="flex items-center gap-0">
                {/* Progress dots */}
                <div className="flex gap-0">
                  {roleData.progress.map((filled, colIdx) => (
                    <div
                      key={colIdx}
                      className={`w-[1.8125rem] h-[1.8125rem] rounded-full ${
                        filled
                          ? "bg-[#1c9afa]"
                          : "bg-[#eef1f6]"
                      }`}
                    />
                  ))}
                </div>
                {/* Role label */}
                <div className="ml-4 text-color-default text-xs font-semibold w-6 font-mono">
                  {roleData.role}
                </div>
              </div>
            ))}
          </div>

          {/* Experience Level Labels */}
          <div className="mt-4 flex text-color-default text-xxs font-semibold">
            <div className="flex-1 text-left">Trainee</div>
            <div className="flex-1 text-center">3-5 years</div>
            <div className="flex-1 text-right">5+ years</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-color-default mb-2"></div>

        {/* Bottom Section */}
        <div className="flex items-center gap-3">
          {/* Progress Circle */}
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 46 46">
              <circle
                cx="23"
                cy="23"
                r="20"
                stroke="#eee"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="23"
                cy="23"
                r="20"
                stroke="#1c9afa"
                strokeWidth="3"
                fill="none"
                strokeDasharray="125.6"
                strokeDashoffset="87.9"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-color-default text-xs font-medium">30%</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1">
            <div className="text-color-default text-sm font-medium">
              Income this week
            </div>
            <div className="text-color-caption text-xs">
              $39k less than last week
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}