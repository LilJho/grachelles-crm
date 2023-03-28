import { useState } from "react";
import { Switch } from "@headlessui/react";

export default function ToggleSwitch({
  enabled,
  toggle,
}: {
  enabled: boolean;
  toggle: () => void;
}) {
  console.log(enabled);
  return (
    <Switch
      checked={enabled}
      onChange={toggle}
      className={`${
        enabled ? "bg-primary" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
