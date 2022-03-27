import { IContextCommandSet, ViewManager } from "@paperbits/common/ui";
import { WidgetContext } from "@paperbits/common/editing";
import { EventManager, Events } from "@paperbits/common/events";
import { SectionModel } from "../section";


export class TabPanelItemHandlers {
    constructor(
        private readonly viewManager: ViewManager,
        private readonly eventManager: EventManager
    ) { }

    public getContextCommands(context: WidgetContext): IContextCommandSet {
        const contextualEditor: IContextCommandSet = {
            color: "#2b87da",
            hoverCommands: [],
            deleteCommand: null,
            selectCommands: [{
                controlType: "toolbox-button",
                displayName: context.binding.displayName,
                tooltip: "Tab settings",
                position: "top right",
                color: "#607d8b",
                callback: () => this.viewManager.openWidgetEditor(context.binding)
            },
            {
                controlType: "toolbox-splitter"
            },
            {
                controlType: "toolbox-button",
                tooltip: "Switch to parent",
                iconClass: "paperbits-icon paperbits-enlarge-vertical",
                position: "top right",
                color: "#607d8b",
                callback: () => {
                    context.switchToParent();
                }
            }]
        };

        if (context.parentModel["tabPanelItems"].length > 1) {
            contextualEditor.deleteCommand = {
                controlType: "toolbox-button",
                tooltip: "Delete tab",
                color: "#607d8b",
                callback: () => {
                    context.parentModel["tabPanelItems"].remove(context.model);
                    context.parentBinding.applyChanges();
                    this.viewManager.clearContextualCommands();
                    this.eventManager.dispatchEvent(Events.ContentUpdate);
                    
                    context.parentBinding["setActiveItem"](0);
                }
            };
        }

        if (context.model.widgets.length === 0) {
            contextualEditor.hoverCommands.push({
                color: "#607d8b",
                controlType: "toolbox-button",
                iconClass: "paperbits-icon paperbits-simple-add",
                position: "center",
                tooltip: "Set tab layout",
                component: {
                    name: "grid-layout-selector",
                    params: {
                        heading: "Set tab layout",
                        onSelect: (section: SectionModel) => { // TODO: Here should come Grid model
                            context.model.widgets = section.widgets;
                            context.binding.applyChanges();

                            this.viewManager.clearContextualCommands();
                            this.eventManager.dispatchEvent(Events.ContentUpdate);
                        }
                    }
                }
            });
        }

        return contextualEditor;
    }
}