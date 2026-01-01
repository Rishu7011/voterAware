import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const TimelineItem = ({ title, desc, icon, isLast }: TimelineProps) => {
    return (
        <>
            <View className="flex-row gap-4">
                <View className="items-center">
                    <View className="w-8 h-8 rounded-full bg-primary items-center justify-center">
                        <MaterialIcons name={icon} size={16} color="white" />
                    </View>
                    {!isLast && (
                        <View className="w-[2px] flex-1 bg-slate-300 dark:bg-slate-700 mt-1" />
                    )}
                </View>

                <View className="pb-6">
                    <Text className="font-semibold text-black dark:text-white">
                        {title}
                    </Text>
                    <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {desc}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default TimelineItem