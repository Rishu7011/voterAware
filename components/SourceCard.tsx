import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const SourceCard = ({icon,title, subtitle, href,uri }: SourceCardProps) => {
    return (
        <>
            <Link href={href as any}>
                <Pressable className=" ">
                    {uri && (<Image source={{ uri }} style={{ width: 32, height: 32, borderRadius: 16 }} />)}
                    {icon && (<MaterialIcons name={icon} size={32} color="#94a3b8" />)}
                    <View className="flex-1">
                        <Text className="font-semibold text-black ">
                            {title}
                        </Text>
                        <Text className="text-sm text-slate-500 ">
                            {subtitle}
                        </Text>
                    </View>
                    <MaterialIcons name="open-in-new" size={20} color="#94a3b8" />
                </Pressable>
            </Link>
        </>
    )
}

export default SourceCard