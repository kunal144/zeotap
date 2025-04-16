import React from "react";
import { Listbox, ListboxItem } from "@heroui/react";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export default function SelectiobBox({
  arr,
  mode,
}: {
  arr: [];
  mode: "single" | "multiple";
}) {
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const handleSelectionChange = (keys: any) => {
    // If keys is a string, wrap it in a Set.
    if (typeof keys === "string") {
      setSelectedKeys(new Set([keys]));
    } else {
      // Otherwise, assume keys is already a set.
      setSelectedKeys(keys);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <ListboxWrapper>
        <Listbox
          disallowEmptySelection
          aria-label="Multiple selection example"
          selectedKeys={selectedKeys}
          selectionMode={mode}
          variant="flat"
          onSelectionChange={handleSelectionChange}
        >
          {arr.map((data: any) => (
            <ListboxItem key={data}>{data}</ListboxItem>
          ))}
        </Listbox>
      </ListboxWrapper>
      <p className="text-small text-default-500">
        Selected value: {selectedValue}
      </p>
    </div>
  );
}
