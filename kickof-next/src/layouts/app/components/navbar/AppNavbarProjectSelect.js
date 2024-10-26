import {Box, FormLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function AppNavbarProjectSelect(props) {
    const { workspaces, selected, onSelect } = props;

    return (
        <Box sx={{ width: 110 }}>
            <FormLabel sx={{ fontSize: 9 }}>Project</FormLabel>
            <Select
                fullWidth
                size="small"
                onChange={(e) => onSelect(e.target.value)}
                value={selected}
                sx={{
                    height: 25,
                    borderRadius: 2,
                    fontSize: 11
                }}>
                {workspaces.map((e, i) => (
                    <MenuItem key={i} value={e}>{e.name}</MenuItem>
                ))}
            </Select>
        </Box>
    )
}