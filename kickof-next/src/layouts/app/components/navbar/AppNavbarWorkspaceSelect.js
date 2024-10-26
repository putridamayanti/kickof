import {Box, FormLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function AppNavbarWorkspaceSelect(props) {
    const { workspaces, selected, onSelect } = props;

    return (
        <Box sx={{ width: 120 }}>
            <FormLabel sx={{ fontSize: 9 }}>Workspace</FormLabel>
            <Select
                fullWidth
                size="small"
                onChange={(e) => onSelect(e.target.value)}
                value={selected}
                sx={{
                    height: 25,
                    borderRadius: 2,
                    fontSize: 11,
                    '& .MuiSelect-select': {
                        paddingRight: '0 !important'
                    }
                }}>
                {workspaces.map((e, i) => (
                    <MenuItem key={i} value={e}>{e.name}</MenuItem>
                ))}
            </Select>
        </Box>
    )
}