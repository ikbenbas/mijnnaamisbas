<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="modal"
            :style="modalStyle"
        >
            <transition name="slide-fade">
                <div
                    v-if="active"
                    class="modal__dialog"
                >
                    <div
                        class="modal__close"
                        :tabindex="visible ? 0 : -1"
                        @click="close"
                        @keyup="close"
                    >
                        <svg
                            class="{classes}"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                        >
                            <path d="M7.2 5.8L5.8 7.2l8.8 8.8-8.8 8.8 1.4 1.4 8.8-8.8 8.8 8.8 1.4-1.4-8.8-8.8 8.8-8.8-1.4-1.4-8.8 8.8z" />
                        </svg>
                    </div>

                    <component
                        :is="component"
                        v-if="component"
                    />
                    <template v-else>
                        <header class="modal__header">
                            <slot name="header" />
                        </header>

                        <section class="modal__body">
                            <slot name="body" />
                        </section>

                        <footer class="modal__footer">
                            <slot
                                name="footer"
                                :close="close"
                                :cancel="cancel"
                            />
                        </footer>
                    </template>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        autoOpen: {
            type: Boolean,
            default: false,
        },
        component: {
            type: Object,
            default: null,
            required: false,
        },
        isProgrammatic: {
            type: Boolean,
            default: false,
        },
        positionHorizontal: {
            type: String,
            default: '',
        },
        positionVertical: {
            type: String,
            default: '',
        },
    },
    emits: ['close', 'cancel', 'open'],
    data() {
        return {
            active: false,
            visible: false,
        };
    },
    computed: {
        modalStyle() {
            return {
                'align-items': this.positionVertical ?? 'center',
                'justify-content': this.positionHorizontal ?? 'center',
            };
        },
    },
    beforeMount() {
        if (this.isProgrammatic) {
            document.body.append(this.$el);
        }
    },
    mounted() {
        if (this.isProgrammatic || this.autoOpen === true) {
            this.open();
        }
    },
    methods: {
        cancel() {
            this.close();
        },
        close() {
            this.active = false;

            setTimeout(() => {
                this.visible = false;
            }, 250);

            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                setTimeout(() => {
                    this.visible = false;
                    this.$destroy();

                    if (typeof this.$el.remove !== 'undefined') {
                        this.$el.remove();
                    } else if (typeof this.$el.parentNode !== 'undefined' && this.$el.parentNode !== null) {
                        this.$el.remove();
                    }

                }, 500);
            }

            this.$emit('close');
        },
        open() {
            this.visible = true;
            this.$emit('open');

            setTimeout(() => {
                this.active = true;
            }, 250);
        },
    },
};
</script>

<style lang="postcss" scoped>
.modal {
    align-items: center;
    backdrop-filter: blur(3px);
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    height: 100%;
    justify-content: center;
    position: fixed;
    top: 0;
    visibility: visible;
    width: 100%;
    z-index: 999;

    &__dialog {
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        padding: 1.5em;
        position: fixed;
        width: 80vw;
    }

    &__close {
        fill: #ddd;
        height: 25px;
        position: absolute;
        right: 1.5em;
        top: 1.5em;
        width: 25px;

        &:hover {
            animation: spin 200ms linear;
            cursor: pointer;
        }
    }
}

.fade-enter-active {
    transition: all 0.3s ease;
}

.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active {
    transition: all 0.5s ease;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.125, 0.3, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}

@keyframes spin {
    100% {
        transform: rotate(180deg);
    }
}

</style>
