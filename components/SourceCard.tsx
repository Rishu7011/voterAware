import { View, Text, Pressable, Image, Linking } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'


const SourceCard = ({ icon, title, subtitle, href, uri }: SourceCardProps) => {
    const openBrowser = () => {
        Linking.openURL(href as any);
    };
    return (
        <>
            <Pressable onPress={openBrowser} style={{ backgroundColor: "#e2e8f0", padding: 10 }} className=" flex-row  items-center gap-4 rounded-xl ">
                {uri && (
                    <Image
                        source={{ uri }}
                        style={{ width: 40, height: 40, borderRadius: 10 }}
                    />)}
                {icon && (
                    <MaterialIcons name={icon} size={40} color="#94a3b8" style={{ borderRadius: 10 }} />
                )}
                <View className="flex-1">
                    <Text className="font-bold text-[#0d141b] " style={{ fontSize: 15, color: '#0d141b' }}>
                        {title}
                    </Text>
                    <Text className="text-sm " style={{ color: '#64748b' }}>
                        {subtitle}
                    </Text>
                </View>
                <MaterialIcons name="open-in-new" size={22} color="#94a3b8" />
            </Pressable>
        </>
    )
}

export default SourceCard