import {createFilterOptions} from "@mui/material";
import CustomTextField from "components/form/CustomTextField";
import {Autocomplete} from "@mui/lab";
import React from "react";

const filter = createFilterOptions();

export default function CustomAutocomplete(props) {
    const { label, options, onChange, value, ...rest } = props;

    return (
        <Autocomplete
            multiple
            value={value}
            onChange={(event, newValue) => {
                if (newValue && newValue.inputValue && newValue.isNew) {
                    onChange({
                        label: newValue.inputValue
                    });
                } else {
                    onChange(newValue)
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.title);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                        isNew: true,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }

                if (option.inputValue) {
                    return option.inputValue;
                }

                return option.label;
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        {option.label}
                    </li>
                );
            }}
            freeSolo
            renderInput={(params) => (
                <CustomTextField {...params} fullWidth label={label} />
            )}
            {...rest}
        />
    )
}
