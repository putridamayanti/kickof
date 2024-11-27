import {
    ChecklistRounded,
    CircleRounded,
    DashboardRounded,
    FolderCopyRounded, PeopleAltRounded,
    SettingsRounded
} from "@mui/icons-material";
import {generateUniqueId} from "utils/helper";

const Menus = [
    {
        id: generateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '/',
    },
    {
        id: generateUniqueId(),
        title: 'Projects',
        icon: FolderCopyRounded,
        href: '/project',
    },
    {
        id: generateUniqueId(),
        title: 'Members',
        icon: PeopleAltRounded,
        href: '/member',
    },
    {
        id: generateUniqueId(),
        title: 'Setting',
        icon: SettingsRounded,
        children: [
            {
                id: generateUniqueId(),
                title: 'User & Role',
                href: '/user',
            },
            {
                id: generateUniqueId(),
                title: 'Permission',
                href: '/user',
            }
        ]
    },
];

export const ProjectMenus = [
    {
        id: generateUniqueId(),
        title: 'Dashboard',
        icon: DashboardRounded,
        href: '/dashboard',
    },
    {
        id: generateUniqueId(),
        title: 'All Tasks',
        icon: ChecklistRounded,
        href: '/',
    },
    {
        id: generateUniqueId(),
        title: 'Members',
        icon: PeopleAltRounded,
        href: '/member',
    },
    {
        id: generateUniqueId(),
        title: 'Setting',
        icon: SettingsRounded,
        children: [
            {
                id: generateUniqueId(),
                title: 'Task Labels',
                href: '/setting/tasklabel',
            }
        ]
    },
];

export default Menus;