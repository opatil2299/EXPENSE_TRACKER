import { Group, Select } from "@mantine/core";
// import { valueGetters } from "@mantine/core/lib/Box/style-system-props/value-getters/value-getters";
import React, { useEffect } from "react";
import { DatePicker, DatePickerInput } from "@mantine/dates";
// import { DateRangePicker } from "@mantine/dates";
function Filters({ setFilters, filters }) {
  return (
    <Group>
      <Select
        label="Select Frequency"
        placeholder="Select Frequency"
        data={[
          { label: "Last Week", value: "7" },
          { label: "Last Month", value: "30" },
          { label: "Last Year", value: "365" },
          { label: "Custom Range", value: "custom-range" },
        ]}
        // value={filters.frequency}
        onChange={(e) => setFilters({ ...filters, frequency: e })}
        // {...getInputProps("frequency")}
        name="frequency"
      />
      {filters.frequency === "custom-range" && (
        <DatePickerInput
          sx={{ width: "350px" }}
          label="Select Date Range"
          // dropdownType="modal"
          type="range"
          placeholder="Pick dates range"
          // value={filters.dateRange}
          onChange={(e) => setFilters({ ...filters, dateRange: e })}
        />
      )}

      <Select
        label="Select Type"
        placeholder="Select Type"
        data={[
          { label: "All", value: "" },
          { label: "Income", value: "income" },
          { label: "Expense", value: "expense" },
        ]}
        // value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e })}
        // {...getInputProps("type")}
        name="type"
      />
    </Group>
  );
}

export default Filters;
