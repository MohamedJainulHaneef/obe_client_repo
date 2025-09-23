import React, { useState } from "react";
import "../manage/staffmanage/staffhod/staffhod.css";

function SearchableDropdown({ label, options, value, onSelect, getOptionLabel, placeholder }) {

    const [search, setSearch] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const filteredOptions = options.filter((opt) =>
        getOptionLabel(opt).toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="smsh-form">
            {label && <label className="smsh-edit-label">{label}</label>}
            <div className="relative">
                <input
                    type="text"
                    className="smsm-inputs dropdown-input"
                    value={search || value || ""}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder={placeholder || (label ? `Search ${label}...` : "Search...")}
                />
                {showDropdown && filteredOptions.length > 0 && (
                    <ul className="dropdown-list">
                        {filteredOptions.map((opt, idx) => (
                            <li
                                key={idx}
                                className="dropdown-item"
                                onClick={() => {
                                    onSelect(opt);
                                    setSearch(getOptionLabel(opt));
                                    setShowDropdown(false);
                                }}
                            >
                                {getOptionLabel(opt)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default SearchableDropdown;