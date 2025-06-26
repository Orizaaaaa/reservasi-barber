import React from 'react'
import Dock from '../../tabBar/Dock'
import { VscAccount, VscArchive, VscHome, VscSettingsGear } from 'react-icons/vsc'

type Props = {
    children: any
}

const mobileLayout = ({ children }: Props) => {
    const items = [
        { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
        { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
        { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
        { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
    ];
    return (
        <section>
            {children}
            <Dock
                items={items}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
            />
        </section>
    )
}

export default mobileLayout