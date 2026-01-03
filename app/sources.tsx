import SourceCard from '@/components/SourceCard'
import TimelineItem from '@/components/TimelineItem'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const sources = () => {
    return (
        <>
            <View className=" flex-1 bg-backgroundLight  ">
                {/* Header */}
                {/* <View className="flex-row items-center px-4 py-3 border-b border-gray-200 ">
                    <Pressable>
                        <MaterialIcons name="chevron-left" size={28} color="#137fec" />
                    </Pressable>
                    <Text className="flex-1 text-center text-lg font-bold text-black ">
                        Transparency & Sources
                    </Text>
                    <View className="w-7" />
                </View> */}

                <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>
                    {/* Intro */}
                    <View className="px-5 pt-6">
                        <Text className="text-2xl font-bold text-black  mb-2">
                            Trusted Data Sources
                        </Text>
                        <Text className="text-slate-500 " style={{ lineHeight: 20 , marginLeft: 5 }}>
                            We aggregate data strictly from official government repositories and
                            verified non-partisan organizations.
                        </Text>
                    </View>

                    {/* Sources */}
                    <View className="px-4 mt-4 gap-5">
                        <SourceCard
                            title="Election Commission of India"
                            uri='https://lh3.googleusercontent.com/aida-public/AB6AXuDldrwbJ6vkPFu3B_Ux3b6W0offhuJwBNAs1Dkm3PHKQtWsPHZNyZkpdciCdPKEbB2bPCkpDBA4UDSaDXyCtXrney_jhwIjDnVLbHQsMybRQvu7MFjNhEkg8zNnvF_Rii6NFBjRtVlRLUMCqBT1fPXKRhvBs7eSnz0gzDeMOVIOaxaZ2wSKHMaGiviHWDX67wnyHijGBTp_22ydU9Nd6YCZbCxG2CT5iqiy08ShpsG3MFq4RxCoJuMj-xlSpUntJA8fcN8UW2F5TA'
                            subtitle="Official electoral rolls & reports"
                            href='https://electoralsearch.eci.gov.in/'
                        />
                        <SourceCard
                            title="PIB Fact Check"
                            subtitle="Government press verification unit"
                            uri='https://lh3.googleusercontent.com/aida-public/AB6AXuClOJaALr2I9Zp-0VFOrPZm3cZv_Ymq9as5SAhL4gucbE6TXEarYrnYnYqCzDxe4wdaZ6JVqszLX6DOW_TPv6IbDLUgRVCHq-rTj9X9eUWurMShHfFPZ4AoMM12PKXfR_5QN6O9l9Ii7nTHDHCsx_nTSRjrIMUBXjt3wge6U2VBTuMSHxHaVt2PNSrDtNATlIbWK_1MM5whTAUxUs59xQ_kYwpkGMP6RBQdEVUT_BJAevvIobWnBi01t2UPEpGB7ulmK3WxOvQ6iw'
                            href='https://www.pib.gov.in/factcheck.aspx?reg=3&lang=2'
                        />
                        <SourceCard
                            title="Supreme Court Judgments"
                            subtitle="Public legal records"
                            icon="gavel"
                            href='https://www.sci.gov.in/'
                        />
                    </View>

                    {/* Verification */}
                    <View className="px-5 mt-8  ">
                        <Text className="text-[25px] font-bold text-[#0d141b]  mb-4" >
                            How We Verify
                        </Text>

                        <View className='gap-8'>
                            <TimelineItem
                                title="Automated Retrieval"
                                desc="Data is pulled from official government APIs every 24 hours."
                                icon="cloud-download"
                            />
                            <TimelineItem
                                title="Human Cross-Check"
                                desc="Editorial team verifies anomalies against official releases."
                                icon="person"
                            />
                            <TimelineItem
                                title="Neutrality Audit & Publish"
                                desc="Final content is reviewed for non-partisan language."
                                icon="verified-user"
                                isLast
                            />
                        </View>
                    </View>

                    {/* Privacy */}
                    <View className="px-4 mt-8">
                        <View className="bg-blue-50  rounded-2xl p-6 border border-blue-100  items-center">
                            <View style={{padding: 5, backgroundColor: '#ffffff' , borderRadius: 10 }}>
                                <MaterialCommunityIcons name="shield-lock" size={45} color="#137fec" />
                            </View>
                            <Text className="text-lg font-bold text-black  mt-3">
                                Neutral & Private
                            </Text>
                            <Text className="text-sm text-slate-600  text-center mt-2">
                                We do not track political preferences or share user data with any
                                third parties.
                            </Text>

                            <TouchableOpacity className="mt-5 bg-primary px-6 py-3 rounded-xl flex-row items-center gap-2">
                                <Text className="text-white font-medium ">
                                    Read Full Privacy Policy
                                </Text>
                                <FontAwesome6 name="arrow-right-long" size={15} color="white" />
                                
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Footer */}
                    <View className="mt-10 py-6 border-t border-slate-200 ">
                        <Text className="text-center text-xs text-slate-400">
                            Made for Democracy · Version 2.4.0
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </>
    )
}

export default sources

const styles = StyleSheet.create({})


