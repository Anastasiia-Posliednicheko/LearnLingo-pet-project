import css from "./Filters.module.css";
import FilterDropdown from "../FilterDropDown/FilterDropdown.jsx";

export default function Filters({
  languages = [],
  levels = [],
  prices = [],
  langFilter,
  levelFilter,
  priceFilter,
  onLangChange,
  onLevelChange,
  onPriceChange,
}) {
  return (
    <div className={css.filter}>
      <FilterDropdown
        label="Language"
        options={languages}
        value={langFilter}
        onChange={onLangChange}
      />

      <FilterDropdown
        label="Level of knowledge"
        options={levels}
        value={levelFilter}
        onChange={onLevelChange}
      />

      <FilterDropdown
        label="Price"
        options={prices}
        value={priceFilter}
        onChange={onPriceChange}
      />
    </div>
  );
}
