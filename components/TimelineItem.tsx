import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const TimelineItem = ({ title, desc, icon, isLast }: TimelineProps) => {
    return (
        <>
            <View className="flex-row gap-4 " style={{ paddingLeft: 8,paddingRight: 8}}>
                <View className="items-center">
                    <View style={{ width: 32, height: 32, backgroundColor: '#137fec', alignItems: 'center', justifyContent: 'center', borderRadius: 16 }}>
                        <MaterialIcons name={icon} size={16} color="white"  />
                    </View>
                    {!isLast && (
                        <View className="w-[2px] flex-1  mt-1" style={{ backgroundColor: '#64748b' }} />
                    )}
                </View>

                <View className="pb-6">
                    <Text style={{ fontWeight: '600', color: '#000' , fontSize: 16}} >
                        {title}
                    </Text>
                    <Text className="text-sm text-slate-500  mt-1">
                        {desc}
                    </Text>
                </View>
            </View>
        </>
    )
}

export default TimelineItem