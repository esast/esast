export function enumerable(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
	descriptor.enumerable = true
	return descriptor
}
