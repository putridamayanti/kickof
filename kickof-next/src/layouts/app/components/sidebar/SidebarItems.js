import SidebarGroup from "layouts/app/components/sidebar/SidebarGroup";
import SidebarItem from "layouts/app/components/sidebar/SidebarItem";

export default function SidebarItems(props) {
    const { items, parent, themeConfig } = props;

    const renderItemsComponent = items.map((e, i) => {
        if (e.children) return <SidebarGroup key={e.id} item={e} parent={parent} themeConfig={themeConfig}/>

        return (
            <SidebarItem key={e.id} item={e} parent={parent} themeConfig={themeConfig}/>
        )
    });

    return <>{renderItemsComponent}</>
}