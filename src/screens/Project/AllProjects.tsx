import { FlatList, Pressable, Text, TouchableOpacity, View } from "react-native"
import styles from "@screens/Project/styles";
import { IProjects } from "@interfaces/projectList";
import { useSelector } from "react-redux";
import StarIconComponent from "@assets/svgImages/star";
import React, { useCallback } from "react";

type ItemProps = {
    item: IProjects;
    onPress: () => void;
    activeHandler?: () => void;
    onToggleStar: () => void;
};

type AllProjects = {
    allProjects: any;
    onPress: (item: IProjects) => void;
    getFav: () => void,
    toggleStar: (item: IProjects) => void
}


/** 
 * render all pojectlist
 * @param AllProjects
*/
const Allprojects: React.FC<AllProjects> = ({ allProjects, onPress, toggleStar }) => {
    const {  isLoading } = useSelector((state: any) => state.projectList);

    // render item function to show the data
    const Item: React.FC<ItemProps> = React.memo(({ item, onPress, onToggleStar }) => (
        <TouchableOpacity style={styles.projects}  onPress={onPress} >
            <View style={styles.projectsWrapper} >
            <View style={{
                width:'90%',
            }}
           >
                <Text style={styles.projectName}>{item.value}</Text>
                <Text style={styles.value}>
                    {`${allProjects?.data[0][0]?.board?.boardName} / ${allProjects?.data[0][0]?.workspace?.workspaceName}`}
                    </Text>
            </View>
            <Pressable onPress={onToggleStar}>
                <StarIconComponent />
            </Pressable>
            </View>
        </TouchableOpacity>
    ));

    const renderItem = useCallback(
        ({ item }: { item: IProjects }) => (
            <Item
                item={item}
                onPress={() => onPress(item)}
                onToggleStar={() => toggleStar(item)}
            />
        ),
        [onPress, toggleStar]
    );

    const keyExtractor = useCallback((item: IProjects) => item.id.toString(), []);

    const projects = allProjects?.data?.flatMap((item: any) => item) || [];
    return (
        <TouchableOpacity style={styles.projectWrapper}>
            {projects?.length > 0 ?
                <FlatList
                data={projects}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                initialNumToRender={10} // Render the first 10 items initially
                maxToRenderPerBatch={10} // Render a batch of 10 items at a time
                windowSize={5} // Reduce window size for less offscreen rendering
                scrollEnabled={false}
                removeClippedSubviews={true} // Unmount subviews when offscreen for memory optimization
                />
                :(
                    !isLoading && (
                        <View style={{ alignItems: 'center' }}>
                            <Text>No Records</Text>
                        </View>
                    )
                )   
            }
        </TouchableOpacity>

    )
}

export default React.memo(Allprojects);