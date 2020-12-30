
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.31.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    // Store

    const language = writable('es');

    /* src/views/About.svelte generated by Svelte v3.31.0 */
    const file = "src/views/About.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i].text;
    	child_ctx[4] = list[i].link;
    	child_ctx[5] = list[i].icon;
    	return child_ctx;
    }

    // (53:4) {#each contactLinks as {text, link, icon}}
    function create_each_block(ctx) {
    	let p;
    	let a;
    	let i;
    	let i_class_value;
    	let t0;
    	let t1_value = /*text*/ ctx[3] + "";
    	let t1;
    	let a_href_value;
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			a = element("a");
    			i = element("i");
    			t0 = space();
    			t1 = text(t1_value);
    			t2 = space();
    			attr_dev(i, "class", i_class_value = "fas fa-" + /*icon*/ ctx[5] + " fa-fw");
    			add_location(i, file, 59, 10, 1700);
    			attr_dev(a, "class", "text-green-500 text-center inline-block transform hover:scale-125");
    			attr_dev(a, "href", a_href_value = /*link*/ ctx[4]);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file, 54, 8, 1545);
    			attr_dev(p, "class", "text-center my-3");
    			add_location(p, file, 53, 6, 1508);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, a);
    			append_dev(a, i);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(p, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(53:4) {#each contactLinks as {text, link, icon}}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let section1;
    	let img;
    	let img_src_value;
    	let t0;
    	let section0;
    	let p0;
    	let t1_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].firstParagraph + "";
    	let t1;
    	let t2;
    	let br0;
    	let t3;
    	let p1;
    	let t4_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].secondParagraph + "";
    	let t4;
    	let t5;
    	let br1;
    	let t6;
    	let p2;
    	let t7_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].thirdParagraph + "";
    	let t7;
    	let t8;
    	let br2;
    	let t9;
    	let p3;
    	let t10_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].fourthParagraph + "";
    	let t10;
    	let t11;
    	let each_value = /*contactLinks*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			section1 = element("section");
    			img = element("img");
    			t0 = space();
    			section0 = element("section");
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			br0 = element("br");
    			t3 = space();
    			p1 = element("p");
    			t4 = text(t4_value);
    			t5 = space();
    			br1 = element("br");
    			t6 = space();
    			p2 = element("p");
    			t7 = text(t7_value);
    			t8 = space();
    			br2 = element("br");
    			t9 = space();
    			p3 = element("p");
    			t10 = text(t10_value);
    			t11 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (img.src !== (img_src_value = "/img/profile-photo.jpeg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Me");
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "rounded-full w-1/3 md:w-1/5");
    			add_location(img, file, 36, 2, 1060);
    			add_location(p0, file, 44, 4, 1219);
    			add_location(br0, file, 45, 4, 1270);
    			add_location(p1, file, 46, 4, 1281);
    			add_location(br1, file, 47, 4, 1333);
    			add_location(p2, file, 48, 4, 1344);
    			add_location(br2, file, 49, 4, 1395);
    			add_location(p3, file, 50, 4, 1406);
    			attr_dev(section0, "class", "px-5 mt-4 md:mt-0");
    			add_location(section0, file, 43, 2, 1179);
    			attr_dev(section1, "class", "flex flex-col md:flex-row justify-center items-center py-12 md:px-20");
    			add_location(section1, file, 35, 0, 971);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section1, anchor);
    			append_dev(section1, img);
    			append_dev(section1, t0);
    			append_dev(section1, section0);
    			append_dev(section0, p0);
    			append_dev(p0, t1);
    			append_dev(section0, t2);
    			append_dev(section0, br0);
    			append_dev(section0, t3);
    			append_dev(section0, p1);
    			append_dev(p1, t4);
    			append_dev(section0, t5);
    			append_dev(section0, br1);
    			append_dev(section0, t6);
    			append_dev(section0, p2);
    			append_dev(p2, t7);
    			append_dev(section0, t8);
    			append_dev(section0, br2);
    			append_dev(section0, t9);
    			append_dev(section0, p3);
    			append_dev(p3, t10);
    			append_dev(section0, t11);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section0, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$language*/ 1 && t1_value !== (t1_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].firstParagraph + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*$language*/ 1 && t4_value !== (t4_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].secondParagraph + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*$language*/ 1 && t7_value !== (t7_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].thirdParagraph + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*$language*/ 1 && t10_value !== (t10_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].fourthParagraph + "")) set_data_dev(t10, t10_value);

    			if (dirty & /*contactLinks*/ 4) {
    				each_value = /*contactLinks*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("About", slots, []);

    	const translation = {
    		en: {
    			firstParagraph: "Hi, my name is Fernando.",
    			secondParagraph: `I have a degree in Computer Science and I love
        software development (web, mobile, etc).`,
    			thirdParagraph: "Here you have my contact if you want to talk.",
    			fourthParagraph: "Regards :D"
    		},
    		es: {
    			firstParagraph: "Hola, mi nombre es Fernando.",
    			secondParagraph: `Soy egresado de la Lic. en Ciencias de la Informática y
        me encanta el desarrollo de aplicaciones (web, móvil, etc).`,
    			thirdParagraph: "Te dejo mi contacto por si gustas charlar.",
    			fourthParagraph: "Saludos :D"
    		}
    	};

    	const contactLinks = [
    		{
    			text: "(+52) 55 3759 2020",
    			link: "tel:5537592020",
    			icon: "phone"
    		},
    		{
    			text: "jfer.garciav@gmail.com",
    			link: "mailto:jfer.garciav@gmail.com",
    			icon: "envelope"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		language,
    		translation,
    		contactLinks,
    		$language
    	});

    	return [$language, translation, contactLinks];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/components/ExperienceJob.svelte generated by Svelte v3.31.0 */

    const file$1 = "src/components/ExperienceJob.svelte";

    function create_fragment$1(ctx) {
    	let article;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let p0;
    	let t2;
    	let t3;
    	let p1;
    	let t4;
    	let t5;
    	let p2;
    	let t6;

    	const block = {
    		c: function create() {
    			article = element("article");
    			div0 = element("div");
    			t0 = text(/*companyFirstLetter*/ ctx[3]);
    			t1 = space();
    			div1 = element("div");
    			p0 = element("p");
    			t2 = text(/*company*/ ctx[0]);
    			t3 = space();
    			p1 = element("p");
    			t4 = text(/*title*/ ctx[2]);
    			t5 = space();
    			p2 = element("p");
    			t6 = text(/*period*/ ctx[1]);
    			attr_dev(div0, "class", "flex justify-center items-center text-5xl");
    			add_location(div0, file$1, 9, 2, 183);
    			attr_dev(p0, "class", "font-bold");
    			add_location(p0, file$1, 14, 4, 331);
    			add_location(p1, file$1, 15, 4, 370);
    			attr_dev(p2, "class", "text-blue-500");
    			add_location(p2, file$1, 16, 4, 389);
    			attr_dev(div1, "class", "col-span-2 border-l text-center py-5");
    			add_location(div1, file$1, 13, 2, 276);
    			attr_dev(article, "class", "bg-white border rounded grid grid-cols-3");
    			add_location(article, file$1, 8, 0, 122);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, div0);
    			append_dev(div0, t0);
    			append_dev(article, t1);
    			append_dev(article, div1);
    			append_dev(div1, p0);
    			append_dev(p0, t2);
    			append_dev(div1, t3);
    			append_dev(div1, p1);
    			append_dev(p1, t4);
    			append_dev(div1, t5);
    			append_dev(div1, p2);
    			append_dev(p2, t6);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*companyFirstLetter*/ 8) set_data_dev(t0, /*companyFirstLetter*/ ctx[3]);
    			if (dirty & /*company*/ 1) set_data_dev(t2, /*company*/ ctx[0]);
    			if (dirty & /*title*/ 4) set_data_dev(t4, /*title*/ ctx[2]);
    			if (dirty & /*period*/ 2) set_data_dev(t6, /*period*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ExperienceJob", slots, []);
    	let { company } = $$props;
    	let { period } = $$props;
    	let { title } = $$props;
    	const writable_props = ["company", "period", "title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ExperienceJob> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("company" in $$props) $$invalidate(0, company = $$props.company);
    		if ("period" in $$props) $$invalidate(1, period = $$props.period);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({
    		company,
    		period,
    		title,
    		companyFirstLetter
    	});

    	$$self.$inject_state = $$props => {
    		if ("company" in $$props) $$invalidate(0, company = $$props.company);
    		if ("period" in $$props) $$invalidate(1, period = $$props.period);
    		if ("title" in $$props) $$invalidate(2, title = $$props.title);
    		if ("companyFirstLetter" in $$props) $$invalidate(3, companyFirstLetter = $$props.companyFirstLetter);
    	};

    	let companyFirstLetter;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*company*/ 1) {
    			 $$invalidate(3, companyFirstLetter = company[0]);
    		}
    	};

    	return [company, period, title, companyFirstLetter];
    }

    class ExperienceJob extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { company: 0, period: 1, title: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ExperienceJob",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*company*/ ctx[0] === undefined && !("company" in props)) {
    			console.warn("<ExperienceJob> was created without expected prop 'company'");
    		}

    		if (/*period*/ ctx[1] === undefined && !("period" in props)) {
    			console.warn("<ExperienceJob> was created without expected prop 'period'");
    		}

    		if (/*title*/ ctx[2] === undefined && !("title" in props)) {
    			console.warn("<ExperienceJob> was created without expected prop 'title'");
    		}
    	}

    	get company() {
    		throw new Error("<ExperienceJob>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set company(value) {
    		throw new Error("<ExperienceJob>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get period() {
    		throw new Error("<ExperienceJob>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set period(value) {
    		throw new Error("<ExperienceJob>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ExperienceJob>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ExperienceJob>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/Experience.svelte generated by Svelte v3.31.0 */

    const file$2 = "src/views/Experience.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (78:4) {#each translation[$language].jobs as job}
    function create_each_block$1(ctx) {
    	let experiencejob;
    	let current;
    	const experiencejob_spread_levels = [/*job*/ ctx[2]];
    	let experiencejob_props = {};

    	for (let i = 0; i < experiencejob_spread_levels.length; i += 1) {
    		experiencejob_props = assign(experiencejob_props, experiencejob_spread_levels[i]);
    	}

    	experiencejob = new ExperienceJob({
    			props: experiencejob_props,
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(experiencejob.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(experiencejob, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const experiencejob_changes = (dirty & /*translation, $language*/ 3)
    			? get_spread_update(experiencejob_spread_levels, [get_spread_object(/*job*/ ctx[2])])
    			: {};

    			experiencejob.$set(experiencejob_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(experiencejob.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(experiencejob.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(experiencejob, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(78:4) {#each translation[$language].jobs as job}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let section1;
    	let h3;
    	let t0_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].title + "";
    	let t0;
    	let t1;
    	let section0;
    	let current;
    	let each_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].jobs;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section1 = element("section");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			section0 = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h3, "class", "font-bold text-3xl text-center text-white border border-white mb-4 rounded");
    			add_location(h3, file$2, 72, 2, 1606);
    			attr_dev(section0, "class", "grid grid-cols-1 sm:grid-cols-2 gap-5 svelte-b9r8iw");
    			add_location(section0, file$2, 76, 2, 1740);
    			attr_dev(section1, "class", "py-12 px-5 svelte-b9r8iw");
    			add_location(section1, file$2, 71, 0, 1575);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section1, anchor);
    			append_dev(section1, h3);
    			append_dev(h3, t0);
    			append_dev(section1, t1);
    			append_dev(section1, section0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section0, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$language*/ 1) && t0_value !== (t0_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].title + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*translation, $language*/ 3) {
    				each_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].jobs;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section1);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Experience", slots, []);

    	const translation = {
    		en: {
    			title: "Work experience",
    			jobs: [
    				{
    					company: "Warriors Labs",
    					period: "Jan - Aug (2018)",
    					title: "Web Developer"
    				},
    				{
    					company: "WeeCompany",
    					period: "Mar - Jul (2019)",
    					title: "Web Developer"
    				},
    				{
    					company: "Klatus",
    					period: "Jul (2018) - Current",
    					title: "Web Developer"
    				},
    				{
    					company: "Keyence",
    					period: "Jan (2020) - Current",
    					title: "Web Developer"
    				}
    			]
    		},
    		es: {
    			title: "Experiencia laboral",
    			jobs: [
    				{
    					company: "Warriors Labs",
    					period: "Ene - Ago (2018)",
    					title: "Desarrollador Web"
    				},
    				{
    					company: "WeeCompany",
    					period: "Mar - Jul (2019)",
    					title: "Desarrollador Web"
    				},
    				{
    					company: "Klatus",
    					period: "Jul (2018) - Actual",
    					title: "Desarrollador Web"
    				},
    				{
    					company: "Keyence",
    					period: "Ene (2020) - Actual",
    					title: "Desarrollador Web"
    				}
    			]
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Experience> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ExperienceJob,
    		language,
    		translation,
    		$language
    	});

    	return [$language, translation];
    }

    class Experience extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Experience",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/views/Footer.svelte generated by Svelte v3.31.0 */
    const file$3 = "src/views/Footer.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (31:4) {#each socialIcons as socialIcon}
    function create_each_block$2(ctx) {
    	let a;
    	let i;
    	let i_class_value;
    	let t;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			i = element("i");
    			t = space();
    			attr_dev(i, "class", i_class_value = "fab fa-" + /*socialIcon*/ ctx[4].icon + " fa-fw text-3xl transform hover:scale-150");
    			add_location(i, file$3, 32, 8, 674);
    			attr_dev(a, "href", a_href_value = /*socialIcon*/ ctx[4].link);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$3, 31, 6, 623);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, i);
    			append_dev(a, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(31:4) {#each socialIcons as socialIcon}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let footer;
    	let section0;
    	let t0;
    	let section1;
    	let i0;
    	let t1;
    	let t2_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].with + "";
    	let t2;
    	let t3;
    	let i1;
    	let t4;
    	let t5_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].author + "";
    	let t5;
    	let t6;
    	let t7;
    	let t8;
    	let each_value = /*socialIcons*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			section0 = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			section1 = element("section");
    			i0 = element("i");
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			i1 = element("i");
    			t4 = space();
    			t5 = text(t5_value);
    			t6 = space();
    			t7 = text(/*year*/ ctx[2]);
    			t8 = text(" ©");
    			add_location(section0, file$3, 29, 2, 569);
    			attr_dev(i0, "class", "fas fa-code fa-fw text-blue-500");
    			add_location(i0, file$3, 38, 4, 807);
    			attr_dev(i1, "class", "fas fa-heart fa-fw text-red-500");
    			add_location(i1, file$3, 40, 4, 891);
    			add_location(section1, file$3, 37, 2, 793);
    			attr_dev(footer, "class", "bg-gray-900 text-white text-center py-10");
    			add_location(footer, file$3, 28, 0, 509);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, section0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section0, null);
    			}

    			append_dev(footer, t0);
    			append_dev(footer, section1);
    			append_dev(section1, i0);
    			append_dev(section1, t1);
    			append_dev(section1, t2);
    			append_dev(section1, t3);
    			append_dev(section1, i1);
    			append_dev(section1, t4);
    			append_dev(section1, t5);
    			append_dev(section1, t6);
    			append_dev(section1, t7);
    			append_dev(section1, t8);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*socialIcons*/ 8) {
    				each_value = /*socialIcons*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(section0, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*$language*/ 1 && t2_value !== (t2_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].with + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*$language*/ 1 && t5_value !== (t5_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].author + "")) set_data_dev(t5, t5_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Footer", slots, []);

    	const translation = {
    		en: {
    			with: "with",
    			author: "by Fernando García in "
    		},
    		es: {
    			with: "con",
    			author: "por Fernando García en "
    		}
    	};

    	const year = new Date().getFullYear();

    	const socialIcons = [
    		{
    			icon: "github",
    			link: "https://github.com/FerGv"
    		},
    		{
    			icon: "linkedin",
    			link: "https://www.linkedin.com/in/jose-fernando-garcia-vazquez"
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		language,
    		translation,
    		year,
    		socialIcons,
    		$language
    	});

    	return [$language, translation, year, socialIcons];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src/views/Header.svelte generated by Svelte v3.31.0 */
    const file$4 = "src/views/Header.svelte";

    function create_fragment$4(ctx) {
    	let header;
    	let section;
    	let h1;
    	let t1;
    	let hr;
    	let t2;
    	let h2;
    	let t3_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].job + "";
    	let t3;

    	const block = {
    		c: function create() {
    			header = element("header");
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "Fernando García";
    			t1 = space();
    			hr = element("hr");
    			t2 = space();
    			h2 = element("h2");
    			t3 = text(t3_value);
    			attr_dev(h1, "class", "text-5xl");
    			add_location(h1, file$4, 29, 4, 580);
    			attr_dev(hr, "class", "w-1/2 m-auto my-3 border-2 border-white");
    			add_location(hr, file$4, 31, 4, 627);
    			attr_dev(h2, "class", "text-2xl");
    			add_location(h2, file$4, 33, 4, 687);
    			attr_dev(section, "class", "name py-20 text-white svelte-ioxo3m");
    			add_location(section, file$4, 28, 2, 536);
    			attr_dev(header, "class", "bg-gray-700 text-center min-h-screen flex flex-col justify-center svelte-ioxo3m");
    			add_location(header, file$4, 27, 0, 451);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, section);
    			append_dev(section, h1);
    			append_dev(section, t1);
    			append_dev(section, hr);
    			append_dev(section, t2);
    			append_dev(section, h2);
    			append_dev(h2, t3);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$language*/ 1 && t3_value !== (t3_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].job + "")) set_data_dev(t3, t3_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Header", slots, []);

    	const translation = {
    		en: { job: "Developer" },
    		es: { job: "Desarrollador" }
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ language, translation, $language });
    	return [$language, translation];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src/components/ProjectCard.svelte generated by Svelte v3.31.0 */

    const file$5 = "src/components/ProjectCard.svelte";

    function create_fragment$5(ctx) {
    	let article;
    	let img;
    	let img_src_value;
    	let t0;
    	let div;
    	let p0;
    	let t1;
    	let t2;
    	let p1;
    	let t3;
    	let t4;
    	let p2;
    	let a;
    	let t5;
    	let i;

    	const block = {
    		c: function create() {
    			article = element("article");
    			img = element("img");
    			t0 = space();
    			div = element("div");
    			p0 = element("p");
    			t1 = text(/*title*/ ctx[3]);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(/*description*/ ctx[0]);
    			t4 = space();
    			p2 = element("p");
    			a = element("a");
    			t5 = text("Ver\n        ");
    			i = element("i");
    			if (img.src !== (img_src_value = "/img/" + /*image*/ ctx[1])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*title*/ ctx[3]);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "rounded-t sm:rounded-t-none sm:rounded-l sm:w-1/2 svelte-pr5tm8");
    			add_location(img, file$5, 28, 2, 416);
    			attr_dev(p0, "class", "font-bold uppercase");
    			add_location(p0, file$5, 36, 4, 644);
    			add_location(p1, file$5, 38, 4, 692);
    			attr_dev(i, "class", "fas fa-external-link-alt fa-fw");
    			add_location(i, file$5, 43, 8, 815);
    			attr_dev(a, "href", /*link*/ ctx[2]);
    			attr_dev(a, "class", "text-blue-500");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$5, 41, 6, 741);
    			attr_dev(p2, "class", "mt-3");
    			add_location(p2, file$5, 40, 4, 718);
    			attr_dev(div, "class", "project-info flex flex-col justify-center content-center px-5 sm:px-10 flex-1 svelte-pr5tm8");
    			add_location(div, file$5, 35, 2, 548);
    			attr_dev(article, "class", "flex flex-col sm:flex-row bg-white text-center rounded flex-1 border");
    			add_location(article, file$5, 27, 0, 327);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, img);
    			append_dev(article, t0);
    			append_dev(article, div);
    			append_dev(div, p0);
    			append_dev(p0, t1);
    			append_dev(div, t2);
    			append_dev(div, p1);
    			append_dev(p1, t3);
    			append_dev(div, t4);
    			append_dev(div, p2);
    			append_dev(p2, a);
    			append_dev(a, t5);
    			append_dev(a, i);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*image*/ 2 && img.src !== (img_src_value = "/img/" + /*image*/ ctx[1])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 8) {
    				attr_dev(img, "alt", /*title*/ ctx[3]);
    			}

    			if (dirty & /*title*/ 8) set_data_dev(t1, /*title*/ ctx[3]);
    			if (dirty & /*description*/ 1) set_data_dev(t3, /*description*/ ctx[0]);

    			if (dirty & /*link*/ 4) {
    				attr_dev(a, "href", /*link*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("ProjectCard", slots, []);
    	let { description } = $$props;
    	let { image } = $$props;
    	let { link } = $$props;
    	let { title } = $$props;
    	const writable_props = ["description", "image", "link", "title"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<ProjectCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("description" in $$props) $$invalidate(0, description = $$props.description);
    		if ("image" in $$props) $$invalidate(1, image = $$props.image);
    		if ("link" in $$props) $$invalidate(2, link = $$props.link);
    		if ("title" in $$props) $$invalidate(3, title = $$props.title);
    	};

    	$$self.$capture_state = () => ({ description, image, link, title });

    	$$self.$inject_state = $$props => {
    		if ("description" in $$props) $$invalidate(0, description = $$props.description);
    		if ("image" in $$props) $$invalidate(1, image = $$props.image);
    		if ("link" in $$props) $$invalidate(2, link = $$props.link);
    		if ("title" in $$props) $$invalidate(3, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [description, image, link, title];
    }

    class ProjectCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			description: 0,
    			image: 1,
    			link: 2,
    			title: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ProjectCard",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*description*/ ctx[0] === undefined && !("description" in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'description'");
    		}

    		if (/*image*/ ctx[1] === undefined && !("image" in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'image'");
    		}

    		if (/*link*/ ctx[2] === undefined && !("link" in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'link'");
    		}

    		if (/*title*/ ctx[3] === undefined && !("title" in props)) {
    			console.warn("<ProjectCard> was created without expected prop 'title'");
    		}
    	}

    	get description() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get image() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set image(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get link() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set link(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<ProjectCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<ProjectCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/Projects.svelte generated by Svelte v3.31.0 */

    const file$6 = "src/views/Projects.svelte";

    // (116:4) {#if currentProject}
    function create_if_block(ctx) {
    	let projectcard;
    	let current;
    	const projectcard_spread_levels = [/*currentProject*/ ctx[1]];
    	let projectcard_props = {};

    	for (let i = 0; i < projectcard_spread_levels.length; i += 1) {
    		projectcard_props = assign(projectcard_props, projectcard_spread_levels[i]);
    	}

    	projectcard = new ProjectCard({ props: projectcard_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(projectcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(projectcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const projectcard_changes = (dirty & /*currentProject*/ 2)
    			? get_spread_update(projectcard_spread_levels, [get_spread_object(/*currentProject*/ ctx[1])])
    			: {};

    			projectcard.$set(projectcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(projectcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(projectcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(projectcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(116:4) {#if currentProject}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let section1;
    	let h3;
    	let t0_value = /*translation*/ ctx[2][/*$language*/ ctx[0]].title + "";
    	let t0;
    	let t1;
    	let section0;
    	let div0;
    	let i0;
    	let t2;
    	let t3;
    	let div1;
    	let i1;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*currentProject*/ ctx[1] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			section1 = element("section");
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			section0 = element("section");
    			div0 = element("div");
    			i0 = element("i");
    			t2 = space();
    			if (if_block) if_block.c();
    			t3 = space();
    			div1 = element("div");
    			i1 = element("i");
    			attr_dev(h3, "class", "font-bold text-3xl text-center border border-black mb-4 rounded");
    			add_location(h3, file$6, 103, 2, 3022);
    			attr_dev(i0, "class", "fas fa-chevron-left fa-fw text-4xl");
    			add_location(i0, file$6, 112, 6, 3309);
    			attr_dev(div0, "class", "flex flex-col justify-center cursor-pointer hover:bg-gray-200");
    			add_location(div0, file$6, 108, 4, 3187);
    			attr_dev(i1, "class", "fas fa-chevron-right fa-fw text-4xl");
    			add_location(i1, file$6, 123, 6, 3574);
    			attr_dev(div1, "class", "flex flex-col justify-center cursor-pointer hover:bg-gray-200");
    			add_location(div1, file$6, 119, 4, 3452);
    			attr_dev(section0, "class", "flex justify-center");
    			add_location(section0, file$6, 107, 2, 3145);
    			attr_dev(section1, "class", "py-12 px-5 bg-gray-300");
    			add_location(section1, file$6, 102, 0, 2979);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section1, anchor);
    			append_dev(section1, h3);
    			append_dev(h3, t0);
    			append_dev(section1, t1);
    			append_dev(section1, section0);
    			append_dev(section0, div0);
    			append_dev(div0, i0);
    			append_dev(section0, t2);
    			if (if_block) if_block.m(section0, null);
    			append_dev(section0, t3);
    			append_dev(section0, div1);
    			append_dev(div1, i1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*lastProject*/ ctx[4], false, false, false),
    					listen_dev(div1, "click", /*nextProject*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$language*/ 1) && t0_value !== (t0_value = /*translation*/ ctx[2][/*$language*/ ctx[0]].title + "")) set_data_dev(t0, t0_value);

    			if (/*currentProject*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*currentProject*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(section0, t3);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Projects", slots, []);

    	const translation = {
    		en: {
    			title: "Projects",
    			projects: [
    				{
    					title: "School Fit",
    					description: "Project dedicated to improve students health at university.",
    					image: "school.jpg",
    					link: "https://github.com/e-mind/Escuela-Fit"
    				},
    				{
    					title: "Lexical analyzer",
    					description: "Get a list of programming languages.",
    					image: "analyzer.png",
    					link: "https://github.com/FerGv/lexical-analyzer"
    				},
    				{
    					title: "Virtual Library",
    					description: "Media content management (images, videos, files).",
    					image: "library.png",
    					link: "https://github.com/FerGv/virtual-library"
    				},
    				{
    					title: "Café",
    					description: "Café inventory management",
    					image: "cafe.jpg",
    					link: "https://github.com/FerGv/SGI"
    				},
    				{
    					title: "Veterinary clinic",
    					description: "Customers, pets and doctors management.",
    					image: "veterinary-clinic.jpg",
    					link: "https://github.com/FerGv/veterinary-clinic"
    				}
    			]
    		},
    		es: {
    			title: "Proyectos",
    			projects: [
    				{
    					title: "Escuela Fit",
    					description: "Proyecto dedicado a mejorar la salud de los alumnos de la UPIICSA.",
    					image: "school.jpg",
    					link: "https://github.com/e-mind/Escuela-Fit"
    				},
    				{
    					title: "Analizador Léxico",
    					description: "Obtención de un listado de lenguajes de programación.",
    					image: "analyzer.png",
    					link: "https://github.com/FerGv/lexical-analyzer"
    				},
    				{
    					title: "Biblioteca Virtual",
    					description: "Gestión de contenido multimedia (fotos, videos, imágenes, archivos).",
    					image: "library.png",
    					link: "https://github.com/FerGv/virtual-library"
    				},
    				{
    					title: "Cafetería",
    					description: "Gestión del inventario de una cafetería.",
    					image: "cafe.jpg",
    					link: "https://github.com/FerGv/SGI"
    				},
    				{
    					title: "Veterinaria",
    					description: "Gestión de clientes, mascotas (citas e historial) y doctores de una clínica veterinaria.",
    					image: "veterinary-clinic.jpg",
    					link: "https://github.com/FerGv/veterinary-clinic"
    				}
    			]
    		}
    	};

    	let projectIndex = 0;

    	function nextProject() {
    		$$invalidate(5, projectIndex = projectIndex + 1);

    		if (projectIndex >= projects.length) {
    			$$invalidate(5, projectIndex = 0);
    		}
    	}

    	function lastProject() {
    		$$invalidate(5, projectIndex = projectIndex - 1);

    		if (projectIndex < 0) {
    			$$invalidate(5, projectIndex = projects.length - 1);
    		}
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		ProjectCard,
    		language,
    		translation,
    		projectIndex,
    		nextProject,
    		lastProject,
    		projects,
    		$language,
    		currentProject
    	});

    	$$self.$inject_state = $$props => {
    		if ("projectIndex" in $$props) $$invalidate(5, projectIndex = $$props.projectIndex);
    		if ("projects" in $$props) $$invalidate(6, projects = $$props.projects);
    		if ("currentProject" in $$props) $$invalidate(1, currentProject = $$props.currentProject);
    	};

    	let projects;
    	let currentProject;

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$language*/ 1) {
    			 $$invalidate(6, projects = translation[$language].projects);
    		}

    		if ($$self.$$.dirty & /*projects, projectIndex*/ 96) {
    			 $$invalidate(1, currentProject = projects[projectIndex]);
    		}
    	};

    	return [
    		$language,
    		currentProject,
    		translation,
    		nextProject,
    		lastProject,
    		projectIndex,
    		projects
    	];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src/components/SkillCard.svelte generated by Svelte v3.31.0 */

    const file$7 = "src/components/SkillCard.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (16:4) {#each Array(stars) as _}
    function create_each_block$3(ctx) {
    	let i;

    	const block = {
    		c: function create() {
    			i = element("i");
    			attr_dev(i, "class", "fas fa-star fa-fw text-yellow-400");
    			add_location(i, file$7, 16, 6, 357);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(16:4) {#each Array(stars) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let article;
    	let p0;
    	let i;
    	let i_class_value;
    	let t0;
    	let p1;
    	let t1;
    	let t2;
    	let p2;
    	let each_value = Array(/*stars*/ ctx[3]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			article = element("article");
    			p0 = element("p");
    			i = element("i");
    			t0 = space();
    			p1 = element("p");
    			t1 = text(/*name*/ ctx[0]);
    			t2 = space();
    			p2 = element("p");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(i, "class", i_class_value = "fas fa-" + /*icon*/ ctx[1] + " fa-fw text-" + /*iconColor*/ ctx[2] + " text-4xl");
    			add_location(i, file$7, 9, 4, 202);
    			add_location(p0, file$7, 8, 2, 194);
    			attr_dev(p1, "class", "font-bold uppercase");
    			add_location(p1, file$7, 12, 2, 272);
    			add_location(p2, file$7, 14, 2, 317);
    			attr_dev(article, "class", "flex flex-col bg-white text-center p-5 rounded transform hover:scale-90");
    			add_location(article, file$7, 7, 0, 102);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, p0);
    			append_dev(p0, i);
    			append_dev(article, t0);
    			append_dev(article, p1);
    			append_dev(p1, t1);
    			append_dev(article, t2);
    			append_dev(article, p2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(p2, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*icon, iconColor*/ 6 && i_class_value !== (i_class_value = "fas fa-" + /*icon*/ ctx[1] + " fa-fw text-" + /*iconColor*/ ctx[2] + " text-4xl")) {
    				attr_dev(i, "class", i_class_value);
    			}

    			if (dirty & /*name*/ 1) set_data_dev(t1, /*name*/ ctx[0]);

    			if (dirty & /*stars*/ 8) {
    				const old_length = each_value.length;
    				each_value = Array(/*stars*/ ctx[3]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = old_length; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (!each_blocks[i]) {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(p2, null);
    					}
    				}

    				for (i = each_value.length; i < old_length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("SkillCard", slots, []);
    	let { name } = $$props;
    	let { icon } = $$props;
    	let { iconColor } = $$props;
    	let { stars } = $$props;
    	const writable_props = ["name", "icon", "iconColor", "stars"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<SkillCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
    		if ("iconColor" in $$props) $$invalidate(2, iconColor = $$props.iconColor);
    		if ("stars" in $$props) $$invalidate(3, stars = $$props.stars);
    	};

    	$$self.$capture_state = () => ({ name, icon, iconColor, stars });

    	$$self.$inject_state = $$props => {
    		if ("name" in $$props) $$invalidate(0, name = $$props.name);
    		if ("icon" in $$props) $$invalidate(1, icon = $$props.icon);
    		if ("iconColor" in $$props) $$invalidate(2, iconColor = $$props.iconColor);
    		if ("stars" in $$props) $$invalidate(3, stars = $$props.stars);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, icon, iconColor, stars];
    }

    class SkillCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { name: 0, icon: 1, iconColor: 2, stars: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SkillCard",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !("name" in props)) {
    			console.warn("<SkillCard> was created without expected prop 'name'");
    		}

    		if (/*icon*/ ctx[1] === undefined && !("icon" in props)) {
    			console.warn("<SkillCard> was created without expected prop 'icon'");
    		}

    		if (/*iconColor*/ ctx[2] === undefined && !("iconColor" in props)) {
    			console.warn("<SkillCard> was created without expected prop 'iconColor'");
    		}

    		if (/*stars*/ ctx[3] === undefined && !("stars" in props)) {
    			console.warn("<SkillCard> was created without expected prop 'stars'");
    		}
    	}

    	get name() {
    		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get iconColor() {
    		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set iconColor(value) {
    		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stars() {
    		throw new Error("<SkillCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stars(value) {
    		throw new Error("<SkillCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/views/Skills.svelte generated by Svelte v3.31.0 */

    const file$8 = "src/views/Skills.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (176:4) {#each translation[$language].techSkills as skill}
    function create_each_block_1(ctx) {
    	let skillcard;
    	let current;
    	const skillcard_spread_levels = [/*skill*/ ctx[2]];
    	let skillcard_props = {};

    	for (let i = 0; i < skillcard_spread_levels.length; i += 1) {
    		skillcard_props = assign(skillcard_props, skillcard_spread_levels[i]);
    	}

    	skillcard = new SkillCard({ props: skillcard_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(skillcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skillcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skillcard_changes = (dirty & /*translation, $language*/ 3)
    			? get_spread_update(skillcard_spread_levels, [get_spread_object(/*skill*/ ctx[2])])
    			: {};

    			skillcard.$set(skillcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skillcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skillcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skillcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(176:4) {#each translation[$language].techSkills as skill}",
    		ctx
    	});

    	return block;
    }

    // (186:4) {#each translation[$language].softSkills as skill}
    function create_each_block$4(ctx) {
    	let skillcard;
    	let current;
    	const skillcard_spread_levels = [/*skill*/ ctx[2]];
    	let skillcard_props = {};

    	for (let i = 0; i < skillcard_spread_levels.length; i += 1) {
    		skillcard_props = assign(skillcard_props, skillcard_spread_levels[i]);
    	}

    	skillcard = new SkillCard({ props: skillcard_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(skillcard.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skillcard, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skillcard_changes = (dirty & /*translation, $language*/ 3)
    			? get_spread_update(skillcard_spread_levels, [get_spread_object(/*skill*/ ctx[2])])
    			: {};

    			skillcard.$set(skillcard_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skillcard.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skillcard.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skillcard, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(186:4) {#each translation[$language].softSkills as skill}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let section2;
    	let h30;
    	let t0_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].techSkillsTitle + "";
    	let t0;
    	let t1;
    	let section0;
    	let t2;
    	let h31;
    	let t3_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].softSkillsTitle + "";
    	let t3;
    	let t4;
    	let section1;
    	let current;
    	let each_value_1 = /*translation*/ ctx[1][/*$language*/ ctx[0]].techSkills;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].softSkills;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			section2 = element("section");
    			h30 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			section0 = element("section");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			h31 = element("h3");
    			t3 = text(t3_value);
    			t4 = space();
    			section1 = element("section");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h30, "class", "text-white font-bold text-3xl text-center border mb-4 rounded");
    			add_location(h30, file$8, 170, 2, 3610);
    			attr_dev(section0, "class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 svelte-1rkjq02");
    			add_location(section0, file$8, 174, 2, 3741);
    			attr_dev(h31, "class", "text-white font-bold text-3xl text-center border mt-10 mb-4 rounded");
    			add_location(h31, file$8, 180, 2, 3926);
    			attr_dev(section1, "class", "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 svelte-1rkjq02");
    			add_location(section1, file$8, 184, 2, 4063);
    			attr_dev(section2, "class", "py-12 px-5 svelte-1rkjq02");
    			add_location(section2, file$8, 169, 0, 3579);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section2, anchor);
    			append_dev(section2, h30);
    			append_dev(h30, t0);
    			append_dev(section2, t1);
    			append_dev(section2, section0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(section0, null);
    			}

    			append_dev(section2, t2);
    			append_dev(section2, h31);
    			append_dev(h31, t3);
    			append_dev(section2, t4);
    			append_dev(section2, section1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(section1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$language*/ 1) && t0_value !== (t0_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].techSkillsTitle + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*translation, $language*/ 3) {
    				each_value_1 = /*translation*/ ctx[1][/*$language*/ ctx[0]].techSkills;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(section0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if ((!current || dirty & /*$language*/ 1) && t3_value !== (t3_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].softSkillsTitle + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*translation, $language*/ 3) {
    				each_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].softSkills;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(section1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section2);
    			destroy_each(each_blocks_1, detaching);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Skills", slots, []);

    	const translation = {
    		en: {
    			techSkillsTitle: "Tech skills",
    			softSkillsTitle: "Soft skills",
    			techSkills: [
    				{
    					name: "Web",
    					icon: "code",
    					iconColor: "blue-400",
    					stars: 4
    				},
    				{
    					name: "Mobile",
    					icon: "mobile-alt",
    					iconColor: "yellow-300",
    					stars: 2
    				},
    				{
    					name: "Database",
    					icon: "database",
    					iconColor: "green-500",
    					stars: 3
    				},
    				{
    					name: "Version control",
    					icon: "code-branch",
    					iconColor: "red-400",
    					stars: 3
    				},
    				{
    					name: "Cloud",
    					icon: "cloud",
    					iconColor: "blue-700",
    					stars: 3
    				},
    				{
    					name: "DevOps",
    					icon: "server",
    					iconColor: "blue-800",
    					stars: 2
    				}
    			],
    			softSkills: [
    				{
    					name: "English",
    					icon: "language",
    					iconColor: "blue-400",
    					stars: 4
    				},
    				{
    					name: "Communication",
    					icon: "comments",
    					iconColor: "yellow-300",
    					stars: 5
    				},
    				{
    					name: "Teamwork",
    					icon: "users",
    					iconColor: "green-500",
    					stars: 5
    				},
    				{
    					name: "Laboriosity",
    					icon: "briefcase",
    					iconColor: "red-400",
    					stars: 5
    				},
    				{
    					name: "Leadership",
    					icon: "award",
    					iconColor: "blue-700",
    					stars: 4
    				}
    			]
    		},
    		es: {
    			techSkillsTitle: "Habilidades técnicas",
    			softSkillsTitle: "Habilidades sociales",
    			techSkills: [
    				{
    					name: "Web",
    					icon: "code",
    					iconColor: "blue-400",
    					stars: 4
    				},
    				{
    					name: "Móvil",
    					icon: "mobile-alt",
    					iconColor: "yellow-300",
    					stars: 2
    				},
    				{
    					name: "Base de datos",
    					icon: "database",
    					iconColor: "green-500",
    					stars: 3
    				},
    				{
    					name: "Control de versiones",
    					icon: "code-branch",
    					iconColor: "red-400",
    					stars: 3
    				},
    				{
    					name: "Cloud",
    					icon: "cloud",
    					iconColor: "blue-700",
    					stars: 3
    				},
    				{
    					name: "DevOps",
    					icon: "server",
    					iconColor: "blue-800",
    					stars: 2
    				}
    			],
    			softSkills: [
    				{
    					name: "Inglés",
    					icon: "language",
    					iconColor: "blue-400",
    					stars: 4
    				},
    				{
    					name: "Comunicación",
    					icon: "comments",
    					iconColor: "yellow-300",
    					stars: 5
    				},
    				{
    					name: "Trabajo en equipo",
    					icon: "users",
    					iconColor: "green-500",
    					stars: 5
    				},
    				{
    					name: "Laboriosidad",
    					icon: "briefcase",
    					iconColor: "red-400",
    					stars: 5
    				},
    				{
    					name: "Liderazgo",
    					icon: "award",
    					iconColor: "blue-700",
    					stars: 4
    				}
    			]
    		}
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		SkillCard,
    		language,
    		translation,
    		$language
    	});

    	return [$language, translation];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/components/Language.svelte generated by Svelte v3.31.0 */
    const file$9 = "src/components/Language.svelte";

    function create_fragment$9(ctx) {
    	let section;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let span;
    	let t1_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].label + "";
    	let t1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			section = element("section");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			if (img.src !== (img_src_value = "/img/" + /*translation*/ ctx[1][/*$language*/ ctx[0]].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].imgAlt);
    			attr_dev(img, "loading", "lazy");
    			attr_dev(img, "class", "svelte-br5lvk");
    			add_location(img, file$9, 36, 2, 806);
    			attr_dev(span, "class", "ml-2");
    			add_location(span, file$9, 42, 2, 923);
    			attr_dev(section, "class", "bg-gray-300 flex justify-center items-center text-blue-500 cursor-pointer");
    			add_location(section, file$9, 32, 0, 681);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, img);
    			append_dev(section, t0);
    			append_dev(section, span);
    			append_dev(span, t1);

    			if (!mounted) {
    				dispose = listen_dev(section, "click", /*changeLanguage*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$language*/ 1 && img.src !== (img_src_value = "/img/" + /*translation*/ ctx[1][/*$language*/ ctx[0]].icon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*$language*/ 1 && img_alt_value !== (img_alt_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].imgAlt)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*$language*/ 1 && t1_value !== (t1_value = /*translation*/ ctx[1][/*$language*/ ctx[0]].label + "")) set_data_dev(t1, t1_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $language;
    	validate_store(language, "language");
    	component_subscribe($$self, language, $$value => $$invalidate(0, $language = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Language", slots, []);

    	const translation = {
    		en: {
    			icon: "lang-es.svg",
    			label: "Ver versión en español",
    			imgAlt: "Cambiar idioma",
    			documentTitle: "Fernando García | Developer"
    		},
    		es: {
    			icon: "lang-en.svg",
    			label: "View English version",
    			imgAlt: "Change language",
    			documentTitle: "Fernando García | Desarrollador"
    		}
    	};

    	const changeLanguage = () => {
    		const isEnglishVersion = $language === "en";
    		language.set(isEnglishVersion ? "es" : "en");
    		document.title = translation[$language].documentTitle;
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Language> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		language,
    		translation,
    		changeLanguage,
    		$language
    	});

    	return [$language, translation, changeLanguage];
    }

    class Language extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Language",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.31.0 */

    const file$a = "src/App.svelte";

    function create_fragment$a(ctx) {
    	let main;
    	let language0;
    	let t0;
    	let header;
    	let t1;
    	let about;
    	let t2;
    	let experience;
    	let t3;
    	let projects;
    	let t4;
    	let skills;
    	let t5;
    	let footer;
    	let t6;
    	let language1;
    	let current;
    	language0 = new Language({ $$inline: true });
    	header = new Header({ $$inline: true });
    	about = new About({ $$inline: true });
    	experience = new Experience({ $$inline: true });
    	projects = new Projects({ $$inline: true });
    	skills = new Skills({ $$inline: true });
    	footer = new Footer({ $$inline: true });
    	language1 = new Language({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(language0.$$.fragment);
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			create_component(about.$$.fragment);
    			t2 = space();
    			create_component(experience.$$.fragment);
    			t3 = space();
    			create_component(projects.$$.fragment);
    			t4 = space();
    			create_component(skills.$$.fragment);
    			t5 = space();
    			create_component(footer.$$.fragment);
    			t6 = space();
    			create_component(language1.$$.fragment);
    			add_location(main, file$a, 13, 0, 389);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(language0, main, null);
    			append_dev(main, t0);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			mount_component(about, main, null);
    			append_dev(main, t2);
    			mount_component(experience, main, null);
    			append_dev(main, t3);
    			mount_component(projects, main, null);
    			append_dev(main, t4);
    			mount_component(skills, main, null);
    			append_dev(main, t5);
    			mount_component(footer, main, null);
    			append_dev(main, t6);
    			mount_component(language1, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(language0.$$.fragment, local);
    			transition_in(header.$$.fragment, local);
    			transition_in(about.$$.fragment, local);
    			transition_in(experience.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(skills.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			transition_in(language1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(language0.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			transition_out(about.$$.fragment, local);
    			transition_out(experience.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(skills.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			transition_out(language1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(language0);
    			destroy_component(header);
    			destroy_component(about);
    			destroy_component(experience);
    			destroy_component(projects);
    			destroy_component(skills);
    			destroy_component(footer);
    			destroy_component(language1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		About,
    		Experience,
    		Footer,
    		Header,
    		Projects,
    		Skills,
    		Language
    	});

    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    // Components

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
